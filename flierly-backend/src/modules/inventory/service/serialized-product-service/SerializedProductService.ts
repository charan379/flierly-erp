import { EntityManager } from "typeorm";
import { SerializedProductStatus } from "../../constants/serialized-product-status.enum";
import SerializedProduct from "../../entities/SerializedProduct.entity";


interface SerializedProductService {
    /**
     * Creates a new serialized product entry.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @param serialNumber - The serial number of the product.
     * @param purchaseInvoiceId - Optional ID of the purchase invoice.
     * @param entityManager - Optional TypeORM EntityManager for transactional operations.
     * @returns The created SerializedProduct.
     */
    newSerialNumber(productId: number, branchId: number, serialNumber: string, purchaseInvoiceId?: string, entityManager?: EntityManager): Promise<SerializedProduct>;

    /**
     * Updates an existing serialized product's status to AVAILABLE if its status is DEISPOSED.
     * If the product does not exist, creates a new entry with status AVAILABLE.
     * Throws an error if the status is not ADJUSTED and the product exists.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @param serialNumber - The serial number of the product.
     * @param purchaseInvoiceId - Optional ID of the purchase invoice.
     * @param entityManager - Optional TypeORM EntityManager for transactional operations.
     * @returns The updated or newly created SerializedProduct.
     */
    pullBackDisposedOrCreateNew(productId: number, branchId: number, serialNumber: string, purchaseInvoiceId?: string, entityManager?: EntityManager): Promise<"updated" | "created">;

    /**
     * Updates the status of an existing serialized product.
     * @param productId - The ID of the product.
     * @param branchId - The ID of the branch.
     * @param serialNumber - The serial number of the product.
     * @param status - The new status to update.
     * @param salesInvoiceId - Optional ID of the sales invoice.
     * @param entityManager - Optional TypeORM EntityManager for transactional operations.
     * @returns The updated SerializedProduct.
     */
    updateStatus(productId: number, branchId: number, serialNumber: string, status: SerializedProductStatus, salesInvoiceId?: string, entityManager?: EntityManager): Promise<SerializedProduct>;
};

export default SerializedProductService;