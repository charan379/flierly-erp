import AccessType from '@/modules/iam/constants/access-types.enum';
import getDifferenceFromArrayOfObjects from '@/utils/get-difference-from-arary-of-objects.util';
import Privilege from '@/modules/iam/entities/Privilege.entity';
import { getEntityList } from '@/modules';
import iocContainer from '@/lib/di-ioc-container';
import LoggerService from '@/modules/core/services/logger-service/LoggerService';
import BeanTypes from '@/lib/di-ioc-container/bean.types';
import DatabaseService from '@/lib/database/database-service/DatabaseService';

// Function to generate privilege array based on entities and access types
async function generatePrivilegesArray(): Promise<Partial<Privilege>[]> {

  const privileges: Partial<Privilege>[] = [];
  const entities = await getEntityList();

  for (let index = 0; index < entities.length; index++) {
    Object.values(AccessType).forEach((access) => {
      const privilege: Partial<Privilege> = {
        name: `${entities[index].entity} - ${access}`,
        access,
        entity: entities[index].entity,
        code: `${entities[index].code}.${access.toLowerCase()}`,
      };
      privileges.push(privilege);
    });

    if (entities[index].entity === 'User') {
      const userPassManagePrivileges: Partial<Privilege> = {
        name: `${entities[index].entity} - ${AccessType.MANAGE} Password`,
        access: AccessType.MANAGE,
        entity: entities[index].entity,
        code: `${entities[index].code}.manage-password`,
      };
      privileges.push(userPassManagePrivileges);
    }
  }
  return privileges;
}

// Function to generate and sync privileges with the database
async function generatePrivileges() {

  const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

  const privilegeRepository = databaseService.getRepository(Privilege);

  // Generate privilege array
  const privileges: Partial<Privilege>[] = await generatePrivilegesArray();

  // Get existing privileges from the database
  const existingPrivileges: Privilege[] = await privilegeRepository.find();

  // Determine privileges to add and remove
  const privilegesToBeAdded: Partial<Privilege>[] = getDifferenceFromArrayOfObjects<Partial<Privilege>>(existingPrivileges, privileges, 'code');
  const privilegesToBeRemoved: Privilege[] = getDifferenceFromArrayOfObjects<Privilege>(privileges, existingPrivileges, 'code');

  // get logger service instance from ioc container
  const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
  const loggerMeta = { service: "GeneratePrivileges" };

  logger.info(`🔑 [Generate Privileges]: \n
    New privileges to be added: ${privilegesToBeAdded.length} \n
    Old privileges to be removed: ${privilegesToBeRemoved.length} \n
    `, loggerMeta);

  // Delete privileges to be removed
  if (privilegesToBeRemoved.length > 0) {
    await privilegeRepository.remove(privilegesToBeRemoved);
    logger.info(`🔑 [Delete Privileges]: Deleted ${privilegesToBeRemoved.length} privileges.`)
  }

  // Insert new privileges
  if (privilegesToBeAdded.length > 0) {
    const result = await privilegeRepository.save(privilegesToBeAdded);
    logger.info(`🔑 [Generate Privileges]: Generated ${result.length} privileges. \n
         Generated privileges are: ${result.map((permission) => permission.code).join(', ')} \n`)
  }
}

export default generatePrivileges;
