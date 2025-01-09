import { generateHash } from '@/lib/bcrypt';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import UserPassword from '../../entities/UserPassword.entity';
import User from '../../entities/User.entity';
import FlierlyException from '@/lib/flierly.exception';
import HttpCodes from '@/constants/http-codes.enum';

async function updateUserPassword(userId: number, password: string): Promise<string> {
  try {
    // Check if user exists
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (user === null) {
      throw new FlierlyException(
        'Invalid User ID !',
        HttpCodes.BAD_REQUEST,
        "Can't find user with provided user id",);
    }

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
  } catch (error) {
    throw error;
  }
}

export default updateUserPassword;
