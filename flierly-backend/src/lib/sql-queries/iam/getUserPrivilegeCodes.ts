import { Privilege } from "@/entities/iam/Privilege.entity";
import executeQueryFromFile from "../queryExecutor";

// Inside the controller itself
async function getUserPrivilegeCodes(userId: number): Promise<Set<string>> {

    const userPrivileges: Privilege[] = await executeQueryFromFile<Privilege[]>("./iam/raw-sql/userPrivileges.sql", [userId]);

    const privilegeSet = new Set(userPrivileges.map((row: any) => row.code));

    return privilegeSet;
};

export default getUserPrivilegeCodes;