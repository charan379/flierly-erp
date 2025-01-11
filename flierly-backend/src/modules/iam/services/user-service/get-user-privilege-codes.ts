import executeQueryFromFile from '@/lib/database/typeorm/query-executors';
import Privilege from '../../entities/Privilege.entity';

/**
 * Retrieves the privilege codes for a given user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to a set of privilege codes.
 */
async function getUserPrivilegeCodes(userId: number): Promise<Set<string>> {
  try {
    // Execute the query to get user privileges
    const userPrivileges: Privilege[] = await executeQueryFromFile<Privilege[]>('lib/database/typeorm/sql-queries/iam/user-privileges.query.sql', [userId]);

    // Create a set of privilege codes
    const privilegeSet = new Set(userPrivileges.map((row: any) => row.code));

    return privilegeSet;
  } catch (error) {
    throw error;
  }
}

export default getUserPrivilegeCodes;