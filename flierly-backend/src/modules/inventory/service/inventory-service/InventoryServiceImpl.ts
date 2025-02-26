import { EntityManager } from "typeorm";
import Inventory from "../../entities/Inventory.entity";
import InventoryService from "./InventoryService";
import { inject, injectable } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import ProductStockService from "@/modules/product/service/product-stock-service/ProductStockService";
import validateClassInstance from "@/lib/class-validator/utils/validate-entity.util";
import { error } from "console";
import FlierlyException from "@/lib/errors/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import ProductAvailabilityView from "@/modules/product/entities/ProductAvailabilityView.entity";

@injectable()
export default class InventoryServiceImpl implements InventoryService {

    constructor(
        @inject(BeanTypes.DatabaseService) private readonly DatabaseService: DatabaseService,
    ) {

    };

    async createInventory(inventory: Partial<Inventory>): Promise<Partial<Inventory>> {
        try {
            const inventoryRepository = this.DatabaseService.getRepository(Inventory);

            const newInventory = inventoryRepository.create(inventory);

            await validateClassInstance(newInventory);

            return await inventoryRepository.save(newInventory);
        } catch (error) {
            throw error;
        }
    };

    async updateInventory(inventoryId: number, update: Partial<Inventory>): Promise<Partial<Inventory>> {
        try {
            const inventoryRepository = this.DatabaseService.getRepository(Inventory);

            // get inventory by id
            const inventory = await inventoryRepository.findOne({ where: { id: inventoryId } });

            if (!inventory) {
                throw new FlierlyException("Inventory not found", HttpCodes.BAD_REQUEST);
            };

            delete update.id;
            delete update.branchId;
            delete update.branch;

            const updatedInventory = inventoryRepository.merge(inventory, update);

            return await inventoryRepository.save(updatedInventory);

        } catch {
            throw error;
        }
    }

    public async statistics(req: { byBranch?: number, byProduct?: number }): Promise<any> {
        try {
            const productAvailabilityViewRepository = this.DatabaseService.getRepository(ProductAvailabilityView);

            const qb = productAvailabilityViewRepository.createQueryBuilder("pav")
                .select([
                    "pav.inventoryType",
                    "COUNT(DISTINCT pav.inventoryId) AS total_inventories",
                    "COALESCE(SUM(pav.stockBalance), 0) AS total_balance"
                ]);

            qb.groupBy("pav.inventoryType");

            if (req.byBranch) {
                qb.addSelect([
                    "pav.branchId",
                    "pav.branchName"
                ])
                qb.addGroupBy("pav.branchId")
                qb.addGroupBy("pav.branchName");
                qb.andWhere("pav.branchId = :branchId", { branchId: req.byBranch });
            }

            if (req.byProduct) {
                qb.addSelect([
                    "pav.productId",
                    "pav.productName"
                ])
                    .addGroupBy("pav.productId")
                    .addGroupBy("pav.productName");
            }

            return await qb.getRawMany();

        } catch (error) {
            throw error;
        }
    }
}