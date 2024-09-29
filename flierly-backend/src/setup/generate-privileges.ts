import AccessType from '@/constants/accessTypes';
import getEntityList from '@/entities';
import { Privilege } from '@/entities/iam/Privilege.entity';
import { AppDataSource } from '@/lib/app-data-source';
import getDifferenceFromArrayOfObjects from '@/utils/get-difference-from-arary-of-objects.util';

// Function to generate privilege array based on entities and access types
async function generatePrivilegesArray(): Promise<Partial<Privilege>[]> {
    const privileges: Partial<Privilege>[] = [];
    const entities = await getEntityList();

    for (let index = 0; index < entities.length; index++) {
        Object.values(AccessType).forEach((access) => {
            const privilege: Partial<Privilege> = {
                name: `${entities[index].entity} - ${access}`,
                access: access,
                entity: entities[index].entity,
                code: `${entities[index].code}.${access.toLowerCase()}`,
            };
            privileges.push(privilege);
        });

        if (entities[index].entity === "User") {
            const userPassManagePrivileges: Partial<Privilege> = {
                name: `${entities[index].entity} - ${AccessType.MANAGE}`,
                access: AccessType.MANAGE,
                entity: entities[index].entity,
                code: `${entities[index].code}.manage-password`,
            }
            privileges.push(userPassManagePrivileges);
        };
    }
    return privileges;
}

// Function to generate and sync privileges with the database
async function generatePrivileges() {
    const privilegeRepository = AppDataSource.getRepository(Privilege);

    // Generate privilege array
    const privileges: Partial<Privilege>[] = await generatePrivilegesArray();

    // Get existing privileges from the database
    const existingPrivileges: Privilege[] = await privilegeRepository.find();

    // Determine privileges to add and remove
    const privilegesToBeAdded: Partial<Privilege>[] = getDifferenceFromArrayOfObjects<Partial<Privilege>>(existingPrivileges, privileges, 'code');
    const privilegesToBeRemoved: Privilege[] = getDifferenceFromArrayOfObjects<Privilege>(privileges, existingPrivileges, 'code');

    console.log(`🔑 [Generate Privileges]: \n
    New privileges to be added: ${privilegesToBeAdded.length} \n
    Old privileges to be removed: ${privilegesToBeRemoved.length} \n
    `);

    // Delete privileges to be removed
    if (privilegesToBeRemoved.length > 0) {
        await privilegeRepository.remove(privilegesToBeRemoved);
        console.log(`🔑 [Delete Privileges]: Deleted ${privilegesToBeRemoved.length} privileges.`);
    }

    // Insert new privileges
    if (privilegesToBeAdded.length > 0) {
        const result = await privilegeRepository.save(privilegesToBeAdded);
        console.log(`🔑 [Generate Privileges]: Generated ${result.length} privileges. \n
         Generated privileges are: ${result.map(permission => permission.code).join(', ')} \n`);
    }
}

export default generatePrivileges;
