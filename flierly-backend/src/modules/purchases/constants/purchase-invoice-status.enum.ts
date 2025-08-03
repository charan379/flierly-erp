export enum PurchaseInvoiceStage {
    DRAFT = 'draft',                       // Invoice created but not yet submitted
    VALIDATION_PENDING = 'validation_pending', // Awaiting validation (e.g., checking against PO / SO)
    VALIDATED = 'validated',               // Validation completed successfully
    PAYMENT_PENDING = 'payment_pending',   // Approved, waiting for payment
    PARTIALLY_PAID = 'partially_paid',     // Payment partially completed
    PAID = 'paid',                         // Fully paid
    CLOSED = 'closed',                     // Fully processed and closed
    CANCELED = 'canceled',                 // Invoice canceled
}