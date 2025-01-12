import { inject, injectable } from "inversify";
import ProductStockService from "./ProductStockService";
import { EntityManager, Repository } from "typeorm";
import ProductStock from "../../entities/ProductStock.entity";
import DatabaseModuleBeanTypes from "@/lib/database/ioc-config/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum";
import InventoryModuleBeanTypes from "../../ioc-config/bean.types";
import InventoryLedgerService from "../inventory-ledger-service/InventoryLedgerService";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";

@injectable()
class ProductStockServiceImpl implements ProductStockService {

    private readonly productStockRepository: Repository<ProductStock>;

    constructor(
        @inject(DatabaseModuleBeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
        @inject(InventoryModuleBeanTypes.InventoryLedgerService) private readonly inventoryLedgerService: InventoryLedgerService,
    ) {
        this.productStockRepository = this.databaseService.getRepository(ProductStock);
    };

    async initializeStock(productId: number, branchId: number, entityManager?: EntityManager): Promise<ProductStock> {
        try {
            const productStock = this.productStockRepository.create({
                product: { id: productId },
                branch: { id: branchId },
                available: 0,
                defective: 0,
                onHand: 0,
                onOrder: 0,
                reserved: 0,
            });

            await validateEntityInstance(productStock);

            if (entityManager) {
                return await entityManager.save(ProductStock, productStock);
            } else {
                return await this.productStockRepository.save(productStock);
            };

        } catch (error) {
            throw error;
        }
    };

    async adjustStock(productId: number, branchId: number, quantity: number, stockType: InventoryLedgerStockType): Promise<ProductStock> {
        try {
            const updatedProductStock = await this.databaseService.executeTransaction<ProductStock>(async (entityManager) => {
                // get the product stock
                let productStock = await entityManager.findOne(ProductStock, {
                    where: { branch: { id: branchId }, product: { id: productId } },
                });
                // initialize stock if it doesn't exist
                if (!productStock) {
                    productStock = await this.initializeStock(productId, branchId, entityManager);
                }
                // update the stock
                switch (stockType) {
                    case InventoryLedgerStockType.ON_HAND:
                        productStock.onHand += quantity;
                        break;
                    case InventoryLedgerStockType.DEFECTIVE:
                        productStock.defective += quantity
                        break;
                    case InventoryLedgerStockType.ON_ORDER:
                        productStock.onOrder += quantity
                        break;
                    case InventoryLedgerStockType.RESERVED:
                        productStock.reserved += quantity
                        break
                    default:
                        throw new FlierlyException('Invalid stock type', HttpCodes.BAD_REQUEST);
                };

                await validateEntityInstance(productStock);

                const updatedProductStock = await entityManager.save(productStock);
                
                await this.inventoryLedgerService.newTransaction(
                    productId,
                    branchId,
                    quantity,
                    stockType,
                );

                return updatedProductStock;
            });
            return updatedProductStock;
        } catch (error) {
            throw error;
        }
    }
};

export default ProductStockServiceImpl;