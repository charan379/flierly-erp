import { UserPassword } from '@/entities/iam/UserPassword.entity';
import { generateHash } from '@/lib/bcrypt';
import { AppDataSource } from '@/lib/typeorm/app-datasource';

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
      password: hashedPassword,
    });
    await userPasswordRepository.save(userPassword);
    return 'Password created successfully.';
  }
}

export default updateUserPassword;
