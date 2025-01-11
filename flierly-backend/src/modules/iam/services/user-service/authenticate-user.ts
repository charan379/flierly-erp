import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import User from "../../entities/User.entity";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import UserPassword from "../../entities/UserPassword.entity";
import { validateHash } from "@/lib/bcrypt";
import getUserPrivilegeCodes from "./get-user-privilege-codes";
import { generateJwtToken } from "@/lib/jwt";


const authenticate = async (username: string, password: string): Promise<AuthenticatedUser> => {
    try {
        // check if user exists with username
        const user: User | null = await AppDataSource.getRepository(User).findOneBy({ username });
        // Throw error if user does not exist
        if (user === null)
            throw new FlierlyException(
                'Invalid username',
                HttpCodes.UNAUTHORIZED,
                "Can't find user with provided username"
            );
        // Throw error if user is inactive
        if (!user.isActive) throw new FlierlyException(
            'Inactive user',
            HttpCodes.BAD_REQUEST,
            'User is not activated');
        // validate credentials with password stored in database
        const userPassword: UserPassword | null = await AppDataSource.getRepository(UserPassword).findOneBy({
            userId: user.id,
        });
        // Throw exception if password not created for user
        if (userPassword === null)
            throw new FlierlyException(
                'User not allowed to login !',
                HttpCodes.UNAUTHORIZED,
                'Password not generated for this user',
            );
        // validate hash
        const isPasswordValid = await validateHash(password, userPassword.password);
        // Throw error if provided password does not match with password stored in database
        if (!isPasswordValid) throw new FlierlyException(
            'Invalid password',
            HttpCodes.BAD_REQUEST,
            'Password does not match');
        // get user privileges codes
        const userPrivilegesCodes: Set<string> = await getUserPrivilegeCodes(user.id);
        // generate jwt token for further authentication with username and userId
        const token = await generateJwtToken(user.id, user.username);
        // tokenExpiresAt
        const tokenExpiresAt = new Date();
        tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 7, tokenExpiresAt.getMinutes() + 30);
        // result object
        const result = {
            user,
            allowedAccess: Array.from(userPrivilegesCodes),
            token,
            loggedInAt: new Date(),
            tokenExpiresAt,
        };

        return result;
    } catch (error) {
        throw error;
    }
};

export default authenticate;