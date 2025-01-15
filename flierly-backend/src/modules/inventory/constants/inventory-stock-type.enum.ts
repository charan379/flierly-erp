/**
 * Inventory Stock Type Enum
 */
export enum InventoryStockType {
    ON_HAND = 'on_hand',       // Available stock in inventory
    ON_ORDER = 'on_order',     // Stock ordered but not yet received
    RESERVED = 'reserved',     // Stock reserved for sales or transfers
    DEFECTIVE = 'defective',   // Stock identified as defective or unusable
}
