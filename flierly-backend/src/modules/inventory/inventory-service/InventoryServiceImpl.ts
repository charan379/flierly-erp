import { EntityManager } from "typeorm";
import Inventory from "../entities/Inventory.entity";
import InventoryService from "./InventoryService";
import { inject, injectable } from "inversify";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import ProductStockService from "@/modules/product/service/product-stock-service/ProductStockService";
import validateEntityInstance from "@/lib/class-validator/utils/validate-entity.util";

@injectable()
export default class InventoryServiceImpl implements InventoryService {

    constructor(
        @inject(BeanTypes.DatabaseService) private readonly DatabaseService: DatabaseService,
        @inject(BeanTypes.ProductStockService) private readonly ProductStockService: ProductStockService,
    ) {

    };

    async createInventory(inventory: Partial<Inventory>, entityManager?: EntityManager): Promise<Partial<Inventory>> {
        try {
            const inventoryRepository = entityManager?.getRepository(Inventory) || this.DatabaseService.getRepository(Inventory);

            const newInventory = inventoryRepository.create(inventory);

            await validateEntityInstance(newInventory);

            return await inventoryRepository.save(newInventory);
        } catch (error) {
            throw error;
        }
    };

}