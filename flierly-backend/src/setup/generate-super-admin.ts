import userDetailsPrompt from '@/setup/prompts/user-details.prompt';
import { generateHash } from '@/lib/bcrypt';
import { AppDataSource } from '../lib/app-data-source';
import { Role } from '@/entities/iam/Role.entity';
import { User } from '@/entities/iam/User.entity';
import { UserPassword } from '@/entities/iam/UserPassword.entity';
import { Privilege } from '@/entities/iam/Privilege.entity';

async function generateSuperAdmin(): Promise<void> {
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
        roles: [superAdminRole]
    });
    await userRepository.save(superAdmin);

    // Update or create password for Super Admin
    await updateUserPassword(superAdmin.id, credsPrompt.password);

    console.log(`🔑 [Super-Admin]: Super Admin created and activated successfully with \n 
        username: ${superAdmin.username} \n
        password: ${credsPrompt.password}
    `);
}

async function updateUserPassword(userId: number, password: string): Promise<void> {
    const userPasswordRepository = AppDataSource.getRepository(UserPassword);

    const hashedPassword = await generateHash(password);

    // Check if password entry exists
    let userPassword = await userPasswordRepository.findOne({ where: { userId } });

    if (userPassword) {
        userPassword.password = hashedPassword;
        
        await userPasswordRepository.save(userPassword);
    } else {
        userPassword = userPasswordRepository.create({
            userId,
            password: hashedPassword
        });
        
        await userPasswordRepository.save(userPassword);
    }
}

async function generateSuperAdminRole(): Promise<Role> {
    const privilegeRepository = AppDataSource.getRepository(Privilege);
    const roleRepository = AppDataSource.getRepository(Role);

    // Fetch all privileges
    const privileges = await privilegeRepository.find();

    // Create Super Admin role
    const superAdminRole = roleRepository.create({
        code: 'super-admin',
        name: 'Super Admin Role',
        description: 'Account Owner / Super Admin',
        privileges: privileges // Assign all privileges to this role
    });

    await roleRepository.save(superAdminRole);

    return superAdminRole;
}

export default generateSuperAdmin;
