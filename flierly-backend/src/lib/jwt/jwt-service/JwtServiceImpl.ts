import jwt, { JwtPayload } from 'jsonwebtoken';
import JwtService from "./JwtService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";
import { inject } from "inversify";
import { EnvConfig } from "@/config/env";
import FlierlyException from '@/lib/errors/flierly.exception';
import HttpCodes from '@/constants/http-codes.enum';

export default class JwtServiceImpl implements JwtService {

    private loggerMeta = { service: "JwtService" };

    private jwtSecret: string;

    private jwtTokenExpiresIn: string | number | undefined;

    private jwtAlgorithem: jwt.Algorithm | undefined;

    constructor(
        @inject(BeanTypes.EnvConfig) private envConfig: typeof EnvConfig,
        @inject(BeanTypes.LoggerService) private loggerService: LoggerService,

    ) {
        this.jwtSecret = this.envConfig.JWT_SECRET;
        this.jwtAlgorithem = "HS256";
        this.jwtTokenExpiresIn = "8h";
    };

    async generateToken(userId: number, username: string): Promise<string> {
        try {
            const signOptions: jwt.SignOptions = {
                expiresIn: this.jwtTokenExpiresIn,
                algorithm: this.jwtAlgorithem,
            };

            const payload: JwtPayload = {
                userId,
                username,
            };

            return jwt.sign(payload, this.jwtSecret, signOptions);
        } catch (error: any) {
            throw new FlierlyException("TOKEN_CREATION_FAILED", HttpCodes.INTERNAL_SERVER_ERROR, error.stack);
        }
    };

    async verifyToken(jwtToken: string): Promise<JwtPayload> {
        try {
            const decodedToken = jwt.verify(jwtToken, this.jwtSecret) as JwtPayload;
            return decodedToken;
        } catch (error: any) {
            this.handleJwtError(error);
        }
    }


    private handleJwtError(error: any): never {
        switch (error.message) {
            case 'invalid signature': {
                throw new FlierlyException("INVALID_SIGNATURE", HttpCodes.UNAUTHORIZED, error.stack);
            }
            case 'invalid token': {
                throw new FlierlyException("INVALID_TOKEN", HttpCodes.UNAUTHORIZED, error.stack);
            }
            case 'jwt expired': {
                throw new FlierlyException("AUTHENTICATION_EXPIRED", HttpCodes.UNAUTHORIZED, error.stack);
            }
            default: {
                throw new FlierlyException("UNKNOWN_ERROR", HttpCodes.UNAUTHORIZED, error.stack);
            }
        }
    }

}