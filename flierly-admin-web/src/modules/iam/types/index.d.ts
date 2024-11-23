
// Define a type based on the Privilege entity
type Privilege = {
    id: number;
    isActive: boolean;
    name: string;
    access: "Create" | "Read" | "Update" | "Delete" | "Manage";
    entity: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};
