import { Privilege } from '@/entities/iam/Privilege.entity';
import executeQueryFromFile from '@/lib/typeorm/query-executors';

/**
 * Retrieves the privilege codes for a given user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to a set of privilege codes.
 */
async function getUserPrivilegeCodes (userId: number): Promise<Set<string>> {
  // Execute the query to get user privileges
  const userPrivileges: Privilege[] = await executeQueryFromFile<Privilege[]>('src/lib/typeorm/sql-queries/iam/user-privileges.query.sql', [userId]);

  // Create a set of privilege codes
  const privilegeSet = new Set(userPrivileges.map((row: any) => row.code));

  return privilegeSet;
}

export default getUserPrivilegeCodes;
