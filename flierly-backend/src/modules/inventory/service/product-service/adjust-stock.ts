import { AppDataSource } from "@/lib/typeorm/app-datasource";
import { InventoryLedgerStockType } from "../../constants/inventory-ledger-stock-type.enum"
import ProductStock from "../../entities/ProductStock.entity";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import InventoryLedger from "../../entities/InventoryLedger.entity";
import { InventoryLedgerTransactionType } from "../../constants/inventory-ledger-transaction-type.enum";

const adjustStock = async (productId: number, stockAdjustType: InventoryLedgerStockType, quantity: number): Promise<ProductStock> => {
    try {
        console.log({ quantity , stockAdjustType, productId });
        const result = await AppDataSource.transaction(async (entityManager) => {

            const productStockRepository = entityManager.getRepository(ProductStock);

            const productStock = await productStockRepository.findOne({ where: { product: { id: productId } } });

            const inventoryLedgerRepository = entityManager.getRepository(InventoryLedger);

            if (!productStock) {
                throw new FlierlyException('Product not found', HttpCodes.BAD_REQUEST);
            };

            switch (stockAdjustType) {
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

            const updatedProductStock = await productStockRepository.save(productStock);

            const inventoryLedger = inventoryLedgerRepository.create({
                product: { id: productId },
                description: `Stock adjustment of ${quantity} ${stockAdjustType} items`,
                quantity: quantity,
                stockType: stockAdjustType,
                transactionType: InventoryLedgerTransactionType.INVENTORY_ADJUSTMENT,
            })

            await inventoryLedgerRepository.save(inventoryLedger);

            return updatedProductStock;
        });

        return result;
    } catch (error) {
        throw error;
    }

};

export default adjustStock;