
// Define a type based on the Privilege entity
type Privilege = {
    id: number;
    isActive: boolean;
    name: string;
    access: "Create" | "Read" | "Update" | "Delete" | "Manage";
    entity: string;
    code: string;
} & EntityTimeStamps;

// Define a type based on the Role entity
type Role = {
    id: number;
    isActive: boolean;
    name: string;
    code: string;
    description: string;
    privileges?: Privilege[]
} & EntityTimeStamps;


