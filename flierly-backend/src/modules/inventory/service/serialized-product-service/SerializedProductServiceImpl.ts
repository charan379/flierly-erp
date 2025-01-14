import { inject, injectable } from "inversify";
import { SerializedProductStatus } from "../../constants/serialized-product-status.enum";
import SerializedProduct from "../../entities/SerializedProduct.entity";
import SerializedProductService from "./SerializedProductService";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import { EntityManager, Repository } from "typeorm";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";

/**
 * Mapping of valid status transitions for SerializedProduct.
 */
const STATUS_TRANSITION_MAP: Record<SerializedProductStatus, SerializedProductStatus[]> = {
    [SerializedProductStatus.AVAILABLE]: [
        SerializedProductStatus.SOLD,
        SerializedProductStatus.DEFECTIVE,
        SerializedProductStatus.UNDER_PDI,
        SerializedProductStatus.RESERVED,
        SerializedProductStatus.ADJUSTED,
    ],
    [SerializedProductStatus.SOLD]: [
        SerializedProductStatus.SALES_RETURN
    ],
    [SerializedProductStatus.DEFECTIVE]: [
        SerializedProductStatus.PURCHASE_RETURN,
        SerializedProductStatus.UNDER_PDI,
        SerializedProductStatus.AVAILABLE
    ],
    [SerializedProductStatus.RESERVED]: [
        SerializedProductStatus.AVAILABLE,
        SerializedProductStatus.DEFECTIVE,
        SerializedProductStatus.SOLD,
    ],
    [SerializedProductStatus.ADJUSTED]: [
        SerializedProductStatus.AVAILABLE
    ],
    [SerializedProductStatus.UNDER_PDI]: [
        SerializedProductStatus.AVAILABLE,
        SerializedProductStatus.DEFECTIVE
    ],
    [SerializedProductStatus.PURCHASE_RETURN]: [],
    [SerializedProductStatus.SALES_RETURN]: [
        SerializedProductStatus.AVAILABLE,
        SerializedProductStatus.DEFECTIVE
    ],
};

@injectable()
export default class SerializedProductServiceImpl implements SerializedProductService {
    private readonly serializedProductRepository: Repository<SerializedProduct>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService
    ) {
        this.serializedProductRepository = this.databaseService.getRepository(SerializedProduct);
    }

    private createSerializedProduct(
        productId: number,
        branchId: number,
        serialNumber: string,
        status: SerializedProductStatus = SerializedProductStatus.AVAILABLE,
        purchaseInvoiceId?: string
    ): SerializedProduct {
        const serializedProduct = this.serializedProductRepository.create({
            product: { id: productId },
            branch: { id: branchId },
            status,
            serialNumber,
            ...(purchaseInvoiceId && { purchaseInvoice: purchaseInvoiceId }),
        });

        return serializedProduct;
    }

    private async saveSerializedProduct(
        serializedProduct: SerializedProduct,
        entityManager?: EntityManager
    ): Promise<SerializedProduct> {
        if (entityManager) {
            return await entityManager.save(SerializedProduct, serializedProduct);
        }
        return await this.serializedProductRepository.save(serializedProduct);
    }

    /**
     * Validate the status transition of a serialized product based on business rules.
     */
    private validateStatusTransition(
        currentStatus: SerializedProductStatus,
        newStatus: SerializedProductStatus
    ): void {
        const validTransitions = STATUS_TRANSITION_MAP[currentStatus] || [];

        if (currentStatus === newStatus) {
            throw new FlierlyException(
                "SerializedProduct status is already the same",
                HttpCodes.BAD_REQUEST
            );
        }

        if (!validTransitions.includes(newStatus)) {
            throw new FlierlyException(
                `Transition from ${currentStatus} to ${newStatus} is not allowed`,
                HttpCodes.BAD_REQUEST
            );
        }
    }

    async newSerialNumber(
        productId: number,
        branchId: number,
        serialNumber: string,
        purchaseInvoiceId?: string,
        entityManager?: EntityManager
    ): Promise<SerializedProduct> {
        try {

            const existingSerializedProduct = await this.serializedProductRepository.findOne({
                where: {
                    product: { id: productId },
                    branch: { id: branchId },
                    serialNumber,
                },
            });

            if (existingSerializedProduct) {
                throw new FlierlyException(`Serialized Product already existing for ${serialNumber}, with status ${existingSerializedProduct.status}`, HttpCodes.BAD_REQUEST);
            };

            const serializedProduct = this.createSerializedProduct(
                productId,
                branchId,
                serialNumber,
                SerializedProductStatus.AVAILABLE,
                purchaseInvoiceId
            );

            await validateEntityInstance(serializedProduct);

            return await this.saveSerializedProduct(serializedProduct, entityManager);
        } catch (error) {
            throw new FlierlyException(
                `Failed to create new serialized product: ${(error as Error)?.message}`,
                HttpCodes.BAD_REQUEST,
                JSON.stringify(error)
            );
        }
    }

    async updateStatus(
        productId: number,
        branchId: number,
        serialNumber: string,
        status: SerializedProductStatus,
        salesInvoiceId?: string,
        entityManager?: EntityManager
    ): Promise<SerializedProduct> {
        try {
            const serializedProduct = await this.serializedProductRepository.findOne({
                where: {
                    product: { id: productId },
                    branch: { id: branchId },
                    serialNumber,
                },
                relations: ["branch", "product"],
            });

            if (!serializedProduct) {
                throw new FlierlyException("SerializedProduct not found", HttpCodes.BAD_REQUEST);
            }

            this.validateStatusTransition(serializedProduct.status, status);

            serializedProduct.status = status;
            if (salesInvoiceId) {
                serializedProduct.salesInvoice = salesInvoiceId;
            }

            await validateEntityInstance(serializedProduct);

            return await this.saveSerializedProduct(serializedProduct, entityManager);
        } catch (error) {
            throw new FlierlyException(
                `Failed to update serialized product: ${(error as Error)?.message}`,
                HttpCodes.BAD_REQUEST,
                JSON.stringify(error)
            );
        }
    }

    async updateAdjustedOrCreateNew(
        productId: number,
        branchId: number,
        serialNumber: string,
        purchaseInvoiceId?: string,
        entityManager?: EntityManager
    ): Promise<"created" | "updated"> {
        try {
            let action: "created" | "updated";
            let serializedProduct = await this.serializedProductRepository.findOne({
                where: {
                    product: { id: productId },
                    branch: { id: branchId },
                    serialNumber,
                },
                relations: ["branch", "product"],
            });

            if (serializedProduct) {
                if (serializedProduct.status !== SerializedProductStatus.ADJUSTED) {
                    throw new FlierlyException(`Not able yo pull back serialized product to available since it is in ${serializedProduct.status}, only ${SerializedProductStatus.ADJUSTED} products can be pulled back to ${SerializedProductStatus.AVAILABLE}`, HttpCodes.BAD_REQUEST);
                }
                this.validateStatusTransition(serializedProduct.status, SerializedProductStatus.AVAILABLE);
                serializedProduct.status = SerializedProductStatus.AVAILABLE;
                action = "updated"
            } else {
                serializedProduct = this.createSerializedProduct(
                    productId,
                    branchId,
                    serialNumber,
                    SerializedProductStatus.AVAILABLE,
                    purchaseInvoiceId
                );
                action = "created"
            }

            await validateEntityInstance(serializedProduct);

            await this.saveSerializedProduct(serializedProduct, entityManager);

            return action;
        } catch (error) {
            throw new FlierlyException(
                `Failed to update or create serialized product: ${(error as Error)?.message}`,
                HttpCodes.BAD_REQUEST,
                JSON.stringify(error)
            );
        }
    }
};