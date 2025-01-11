import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import User from "../../entities/User.entity";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import getUserPrivilegeCodes from "./get-user-privilege-codes";
import { generateJwtToken } from "@/lib/jwt";

const refreshUserAccessToken = async (userId: number): Promise<AuthenticatedUser> => {
    try {
        // check if user exists with userId
        const user: User | null = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        // Throw error if user does not exist
        if (user === null)
            throw new FlierlyException(
                'Invalid userId',
                HttpCodes.UNAUTHORIZED,
                "Can't find user with provided username");
        // Throw error if user is inactive
        if (!user.isActive) throw new FlierlyException(
            'Inactive user',
            HttpCodes.BAD_REQUEST,
            'User is not activated');
        // get user privileges codes
        const userPrivilegesCodes: Set<string> = await getUserPrivilegeCodes(user.id);
        // generate jwt token for further authentication with username and userId
        const token = await generateJwtToken(user.id, user.username);
        // tokenExpiresAt
        const tokenExpiresAt = new Date();
        tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 7, tokenExpiresAt.getMinutes() + 30);
        // response object
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

export default refreshUserAccessToken;