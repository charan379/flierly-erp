export enum PurchaseOrderStatus {
    DRAFT = 'draft',                  // Initial draft, not yet submitted
    SUBMITTED = 'submitted',          // Submitted for review/approval
    IN_REVIEW = 'in_review',          // Undergoing approval/review process
    APPROVED = 'approved',            // Approved for processing
    PARTIALLY_RECEIVED = 'partially_received', // Some items received
    FULLY_RECEIVED = 'fully_received', // All items received
    INVOICED = 'invoiced',            // Invoice generated
    CLOSED = 'closed',          // Fully processed and completed
    CANCELED = 'canceled',            // Order canceled before completion
}
