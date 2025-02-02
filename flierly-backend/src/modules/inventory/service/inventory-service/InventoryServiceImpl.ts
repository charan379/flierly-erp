import { EntityManager } from "typeorm";
import Inventory from "../../entities/Inventory.entity";
import InventoryService from "./InventoryService";
import { inject, injectable } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import ProductStockService from "@/modules/product/service/product-stock-service/ProductStockService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";
import { error } from "console";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";

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

            await validateEntityInstance(newInventory);

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

}