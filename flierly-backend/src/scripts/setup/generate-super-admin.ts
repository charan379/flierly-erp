import userDetailsPrompt from '@/scripts/setup/prompts/user-details.prompt';
import Role from '@/modules/iam/entities/Role.entity';
import User from '@/modules/iam/entities/User.entity';
import Privilege from '@/modules/iam/entities/Privilege.entity';
import iocContainer from '@/lib/di-ioc-container';
import LoggerService from '@/modules/core/services/logger-service/LoggerService';
import BeanTypes from '@/lib/di-ioc-container/bean.types';
import DatabaseService from '@/lib/database/database-service/DatabaseService';
import UserService from '@/modules/iam/services/user-service/UserService';
import UserCredentialsDTO from '@/modules/iam/dto/UserCredentials.dto';

async function generateSuperAdmin(): Promise<void> {

  const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);
  const userServices = iocContainer.get<UserService>(BeanTypes.UserService);
  const roleRepository = databaseService.getRepository(Role);
  const userRepository = databaseService.getRepository(User);

  // get logger service instance from ioc container
  const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
  const loggerMeta = { service: "GenerateSuperAdmin" };

  // Check if Super Admin role exists
  let superAdminRole = await roleRepository.findOne({ where: { code: 'super-admin.owner' }, relations: ['privileges'] });

  if (!superAdminRole) {
    superAdminRole = await generateSuperAdminRole();
  }

  const credsPrompt = await userDetailsPrompt();

  // Create Super Admin user
  const superAdmin = userRepository.create({
    username: credsPrompt.username,
    email: credsPrompt.email,
    mobile: credsPrompt.mobile,
    roles: [superAdminRole],
  });


  await userRepository.save(superAdmin);

  const superAdminCreds: UserCredentialsDTO = {
    username: superAdmin.username,
    password: credsPrompt.password,
  }
  // Update or create password for Super Admin
  await userServices.updatePassword(superAdmin.id, superAdminCreds);

  logger.info(`🔑 [Super-Admin]: Super Admin created and activated successfully with \n 
        username: ${superAdmin.username}
    `, loggerMeta);
}

async function generateSuperAdminRole(): Promise<Role> {

  const databaseService = iocContainer.get<DatabaseService>(BeanTypes.DatabaseService);

  const privilegeRepository = databaseService.getRepository(Privilege);
  const roleRepository = databaseService.getRepository(Role);

  // Fetch all privileges
  const privileges = await privilegeRepository.find();

  // Create Super Admin role
  const superAdminRole = roleRepository.create({
    code: 'super-admin.owner',
    name: 'Super Admin Role',
    description: 'Account Owner / Super Admin',
    privileges, // Assign all privileges to this role
  });

  await roleRepository.save(superAdminRole);

  return superAdminRole;
}

export default generateSuperAdmin;
