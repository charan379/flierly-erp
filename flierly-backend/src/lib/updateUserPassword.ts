import { UserPassword } from "@/entities/iam/UserPassword.entity";
import { AppDataSource } from "./app-data-source";
import { generateHash } from "./bcrypt";


async function updateUserPassword(userId: number, password: string): Promise<string> {
    const userPasswordRepository = AppDataSource.getRepository(UserPassword);

    // Generate hashed password
    const hashedPassword = await generateHash(password);

    // Check if password entry exists
    let userPassword = await userPasswordRepository.findOne({ where: { userId } });

    if (userPassword) {
        // Update existing password
        userPassword.password = hashedPassword;
        await userPasswordRepository.save(userPassword);
        return 'Password updated successfully.';
    } else {
        // Create a new password entry
        userPassword = userPasswordRepository.create({
            userId,
            password: hashedPassword
        });
        await userPasswordRepository.save(userPassword);
        return 'Password created successfully.';
    }
}

export default updateUserPassword;
