import userDetailsPrompt from '@/setup/prompts/user-details.prompt';
import { AppDataSource } from '../lib/typeorm/app-datasource';
import { Role } from '@/entities/iam/Role.entity';
import { User } from '@/entities/iam/User.entity';
import { Privilege } from '@/entities/iam/Privilege.entity';
import updateUserPassword from '@/service/iam/update-user-password.service';

async function generateSuperAdmin (): Promise<void> {
  const roleRepository = AppDataSource.getRepository(Role);
  const userRepository = AppDataSource.getRepository(User);

  // Check if Super Admin role exists
  let superAdminRole = await roleRepository.findOne({ where: { code: 'super-admin' }, relations: ['privileges'] });

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

  console.log(`🔑 [Super-Admin]: Super Admin created and activated successfully with \n 
        username: ${superAdmin.username} \n
        password: ${credsPrompt.password}
    `);
}

async function generateSuperAdminRole (): Promise<Role> {
  const privilegeRepository = AppDataSource.getRepository(Privilege);
  const roleRepository = AppDataSource.getRepository(Role);

  // Fetch all privileges
  const privileges = await privilegeRepository.find();

  // Create Super Admin role
  const superAdminRole = roleRepository.create({
    code: 'super-admin',
    name: 'Super Admin Role',
    description: 'Account Owner / Super Admin',
    privileges, // Assign all privileges to this role
  });

  await roleRepository.save(superAdminRole);

  return superAdminRole;
}

export default generateSuperAdmin;
