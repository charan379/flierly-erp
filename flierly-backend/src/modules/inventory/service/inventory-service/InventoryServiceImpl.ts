import Inventory from "../../entities/Inventory.entity";
import InventoryService from "./InventoryService";
import { inject, injectable } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import validateClassInstance from "@/lib/class-validator/utils/validate-entity.util";
import { error } from "console";
import FlierlyException from "@/lib/errors/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import ProductStock from "@/modules/product/entities/ProductStock.entity";

@injectable()
export default class InventoryServiceImpl implements InventoryService {

    constructor(
        @inject(BeanTypes.DatabaseService) private readonly databaseService: DatabaseService,
    ) {

    };

    async createInventory(inventory: Partial<Inventory>): Promise<Partial<Inventory>> {
        try {
            const inventoryRepository = this.databaseService.getRepository(Inventory);

            const newInventory = inventoryRepository.create(inventory);

            await validateClassInstance(newInventory);

            return await inventoryRepository.save(newInventory);
        } catch (error) {
            throw error;
        }
    };

    async updateInventory(inventoryId: number, update: Partial<Inventory>): Promise<Partial<Inventory>> {
        try {
            const inventoryRepository = this.databaseService.getRepository(Inventory);

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
            const qb = this.databaseService.getQueryBuilder(Inventory, "inventory");

            qb.select("inventory.inventoryType", "inventoryType")
                .addSelect("COUNT(DISTINCT inventory.id) as inventoriesCount")
                .addSelect("COALESCE(SUM(ps.balance), 0) as stockBalance")
                .leftJoin(ProductStock, "ps", "inventory.id = ps.inventoryId")
                .groupBy("inventory.inventoryType")

            if (req.byBranch) {
                qb.addSelect("inventory.branchId", "branchId")
                    .andWhere("inventory.branchId = :branchId", { branchId: req.byBranch })
                    .addGroupBy("inventory.branchId")

            };

            if (req.byProduct) {
                qb.addSelect("ps.productId", "productId")
                    .andWhere("ps.productId = :productId", { productId: req.byProduct })
                    .addGroupBy("ps.productId")
            };

            return await qb.getRawMany();

        } catch (error) {
            throw error;
        }
    }
}