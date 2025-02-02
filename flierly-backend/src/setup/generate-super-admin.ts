import userDetailsPrompt from '@/setup/prompts/user-details.prompt';
import { AppDataSource } from '../lib/database/typeorm/app-datasource';
import updateUserPassword from '@/modules/iam/services/user-service/update-user-password';
import Role from '@/modules/iam/entities/Role.entity';
import User from '@/modules/iam/entities/User.entity';
import Privilege from '@/modules/iam/entities/Privilege.entity';
import iocContainer from '@/lib/di-ioc-container';
import LoggerService from '@/modules/core/services/logger-service/LoggerService';
import BeanTypes from '@/lib/di-ioc-container/bean.types';

async function generateSuperAdmin(): Promise<void> {
  const roleRepository = AppDataSource.getRepository(Role);
  const userRepository = AppDataSource.getRepository(User);

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

  // Update or create password for Super Admin
  await updateUserPassword(superAdmin.id, credsPrompt.password);

  logger.info(`🔑 [Super-Admin]: Super Admin created and activated successfully with \n 
        username: ${superAdmin.username}
    `, loggerMeta);
}

async function generateSuperAdminRole(): Promise<Role> {
  const privilegeRepository = AppDataSource.getRepository(Privilege);
  const roleRepository = AppDataSource.getRepository(Role);

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
