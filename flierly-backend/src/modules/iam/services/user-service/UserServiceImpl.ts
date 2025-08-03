import UserService from "./UserService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import DatabaseService from "@/lib/database/database-service/DatabaseService";
import { inject } from "inversify";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";
import User from "../../entities/User.entity";
import FlierlyException from "@/lib/errors/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import UserPassword from "../../entities/UserPassword.entity";
import JwtService from "@/lib/jwt/jwt-service/JwtService";
import { BcryptService } from "@/lib/hashing/bcrypt-service/BcryptService";
import Privilege from "../../entities/Privilege.entity";
import UserCredentialsDTO from "../../dto/UserCredentials.dto";

export default class UserServiceImpl implements UserService {

    constructor(
        @inject(BeanTypes.DatabaseService) private databaseService: DatabaseService,
        @inject(BeanTypes.LoggerService) private loggerService: LoggerService,
        @inject(BeanTypes.JwtService) private jwtService: JwtService,
        @inject(BeanTypes.BcryptService) private bcryptService: BcryptService,
    ) {

    };

    async authenticate(username: string, password: string): Promise<AuthenticatedUser> {
        try {
            // check if user exists with username
            const user: User | null = await this.databaseService.getRepository(User).findOneBy({ username });
            // Throw error if user does not exist
            if (user === null)
                throw new FlierlyException(
                    'INVALID_USERNAME',
                    HttpCodes.UNAUTHORIZED,
                    "Can't find user with provided username"
                );
            // Throw error if user is inactive
            if (!user.isActive) throw new FlierlyException(
                'INACTIVE_USER',
                HttpCodes.BAD_REQUEST,
                'User is not activated');
            // validate credentials with password stored in database
            const userPassword: UserPassword | null = await this.databaseService.getRepository(UserPassword).findOneBy({
                userId: user.id,
            });
            // Throw exception if password not created for user
            if (userPassword === null)
                throw new FlierlyException(
                    'USER_PASSWORD_NOT_CREATED',
                    HttpCodes.UNAUTHORIZED,
                    'Password not generated for this user',
                );
            // validate hash
            const isPasswordValid = await this.bcryptService.validateHash(password, userPassword.password);
            // Throw error if provided password does not match with password stored in database
            if (!isPasswordValid) throw new FlierlyException(
                'INVALID_PASSWORD',
                HttpCodes.BAD_REQUEST,
                'Password does not match');
            // get user privileges codes
            const userPrivilegesCodes: Set<string> = await this.getPrivilegeCodes(user.id);
            // generate jwt token for further authentication with username and userId
            const token = await this.jwtService.generateToken(user.id, user.username);
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

    async refreshAccessToken(userId: number): Promise<AuthenticatedUser> {
        try {
            // check if user exists with userId
            const user: User | null = await this.databaseService.getRepository(User).findOneBy({ id: userId });
            // Throw error if user does not exist
            if (user === null)
                throw new FlierlyException(
                    'INVAID_USER_ID',
                    HttpCodes.UNAUTHORIZED,
                    "Can't find user with provided username");
            // Throw error if user is inactive
            if (!user.isActive) throw new FlierlyException(
                'INACTIVE_USER',
                HttpCodes.BAD_REQUEST,
                'User is not activated');
            // get user privileges codes
            const userPrivilegesCodes: Set<string> = await this.getPrivilegeCodes(user.id);
            // generate jwt token for further authentication with username and userId
            const token = await this.jwtService.generateToken(user.id, user.username);
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

    async updatePassword(userId: number, userCredentialsDTO: UserCredentialsDTO): Promise<string> {
        try {
            // Check if user exists
            const userRepository = this.databaseService.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId, username: userCredentialsDTO.username } });

            if (user === null) {
                throw new FlierlyException(
                    'USER_NOT_FOUND',
                    HttpCodes.BAD_REQUEST,
                    "Can't find user with provided user id",);
            }

            const userPasswordRepository = this.databaseService.getRepository(UserPassword);

            // Generate hashed password
            const hashedPassword = await this.bcryptService.generateHash(userCredentialsDTO.password);

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
    };

    async getPrivilegeCodes(userId: number): Promise<Set<string>> {
        try {
            // Execute the query to get user privileges
            const entityManager = this.databaseService.createEntityManager();

            const userRolesSubQuery = entityManager.createQueryBuilder()
                .select('role_id')
                .from('user_roles', 'ur')
                .where('ur.user_id = :userId', { userId });

            const rolePrivilegesSubQuery = entityManager.createQueryBuilder()
                .select('DISTINCT rp.privilege_id')
                .from('role_privileges', 'rp')
                .innerJoin(`(${userRolesSubQuery.getQuery()})`, 'ur', 'rp.role_id = ur.role_id');

            const additionalPrivilegesSubQuery = entityManager.createQueryBuilder()
                .select('privilege_id')
                .from('user_additional_privileges', 'uap')
                .where('uap.user_id = :userId', { userId });

            const restrictedPrivilegesSubQuery = entityManager.createQueryBuilder()
                .select('privilege_id')
                .from('user_restricted_privileges', 'urp')
                .where('urp.user_id = :userId', { userId });

            const privilegesQuery = entityManager.createQueryBuilder()
                .select('p')
                .from(Privilege, 'p')
                .innerJoin(`(${rolePrivilegesSubQuery.getQuery()})`, 'rp', 'p.id = rp.privilege_id')
                .leftJoin(`(${additionalPrivilegesSubQuery.getQuery()})`, 'ap', 'p.id = ap.privilege_id')
                .leftJoin(`(${restrictedPrivilegesSubQuery.getQuery()})`, 'rp2', 'p.id = rp2.privilege_id')
                .where('rp2.privilege_id IS NULL')
                .setParameter('userId', userId);

            const userPrivileges = await privilegesQuery.getMany();

            // Create a set of privilege codes
            const privilegeSet = new Set(userPrivileges.map((row: any) => row.code));

            return privilegeSet;
        } catch (error) {
            throw error;
        }
    };

}