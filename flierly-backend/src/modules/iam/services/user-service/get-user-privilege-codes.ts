import Privilege from '../../entities/Privilege.entity';
import { AppDataSource } from '@/lib/database/typeorm/app-datasource';

/**
 * Retrieves the privilege codes for a given user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to a set of privilege codes.
 */
async function getUserPrivilegeCodes(userId: number): Promise<Set<string>> {
  try {
    // Execute the query to get user privileges
    const entityManager = AppDataSource.createEntityManager();

    const userRolesSubQuery = entityManager.createQueryBuilder()
      .select('role_id')
      .from('user_roles', 'ur')
      .where('ur.user_id = :userId', { userId });

    const rolePrivilegesSubQuery = entityManager.createQueryBuilder()
      .select('DISTINCT rp.privilege_id')
      .from('role_privileges', 'rp')
      .innerJoin(`(${userRolesSubQuery.getQuery()})`, 'ur', 'rp.role_id = ur.role_id');

    const additionalPrivilegesSubQuery = entityManager.createQueryBuilder()
      .select('privilege_id')
      .from('user_additional_privileges', 'uap')
      .where('uap.user_id = :userId', { userId });

    const restrictedPrivilegesSubQuery = entityManager.createQueryBuilder()
      .select('privilege_id')
      .from('user_restricted_privileges', 'urp')
      .where('urp.user_id = :userId', { userId });

    const privilegesQuery = entityManager.createQueryBuilder()
      .select('p')
      .from(Privilege, 'p')
      .innerJoin(`(${rolePrivilegesSubQuery.getQuery()})`, 'rp', 'p.id = rp.privilege_id')
      .leftJoin(`(${additionalPrivilegesSubQuery.getQuery()})`, 'ap', 'p.id = ap.privilege_id')
      .leftJoin(`(${restrictedPrivilegesSubQuery.getQuery()})`, 'rp2', 'p.id = rp2.privilege_id')
      .where('rp2.privilege_id IS NULL')
      .setParameter('userId', userId);

    const userPrivileges = await privilegesQuery.getMany();

    // Create a set of privilege codes
    const privilegeSet = new Set(userPrivileges.map((row: any) => row.code));

    return privilegeSet;
  } catch (error) {
    throw error;
  }
}

export default getUserPrivilegeCodes;