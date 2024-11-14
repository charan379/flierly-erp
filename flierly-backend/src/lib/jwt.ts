import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import FlierlyException from './flierly.exception';
import HttpCodes from '@/constants/httpCodes';
import Config from '@/config';
import mongoose from 'mongoose';

// Create a type alias that combines JwtPayload with custom properties
export type CustomJwtPayload = JwtPayload & {
    username?: string;
    userId?: mongoose.ObjectId;
};

dotenv.config();

const ERROR_MESSAGES = {
    TOKEN_CREATION_FAILED: 'Token Creation Failed',
    UNAUTHORIZED_LOGIN: 'Unauthorized Please Login!',
    AUTHENTICATION_EXPIRED: 'Authentication Expired Please Login!',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    INVALID_SIGNATURE: 'Token probably modified or signature changed: invalid signature',
    INVALID_TOKEN: 'Token probably modified or signature changed: invalid token',
    JWT_EXPIRED: 'Token Expired Re-authenticate',
    UNKNOWN_ERROR: 'Unknown Error Occurred while decoding token',
};

const jwtSecret: string = Config.JWT_SECRET ?? ''

export async function generateJwtToken(userId: mongoose.ObjectId, username: string): Promise<String> {

    try {
        const signOptions: jwt.SignOptions = {
            expiresIn: '8h',
            algorithm: 'HS256'
        };

        const payload: CustomJwtPayload = {
            userId: userId,
            username: username,
        };

        return jwt.sign(payload, jwtSecret, signOptions);

    } catch (error: any) {
        throw new FlierlyException(
            ERROR_MESSAGES.TOKEN_CREATION_FAILED,
            HttpCodes.INTERNAL_SERVER_ERROR,
            `JWT token creation failed for user: ${username}`,
            error.stack
        )
    };
};

export async function verifyJwtToken(jwtToken: string): Promise<CustomJwtPayload> {

    try {
        const decodedToken = jwt.verify(jwtToken, jwtSecret) as CustomJwtPayload;
        return decodedToken;
    } catch (error: any) {
        handleJwtError(error);
    }
};

function handleJwtError(error: any): never {
    switch (error.message) {
        case 'invalid signature': {
            throw new FlierlyException(
                ERROR_MESSAGES.INVALID_SIGNATURE,
                HttpCodes.UNAUTHORIZED,
                ERROR_MESSAGES.INVALID_SIGNATURE,
                error.stack);
        };
        case 'invalid token': {
            throw new FlierlyException(
                ERROR_MESSAGES.INVALID_TOKEN,
                HttpCodes.UNAUTHORIZED,
                ERROR_MESSAGES.INVALID_TOKEN,
                error.stack);
        };
        case 'jwt expired': {
            throw new FlierlyException(
                ERROR_MESSAGES.AUTHENTICATION_EXPIRED,
                HttpCodes.UNAUTHORIZED,
                ERROR_MESSAGES.JWT_EXPIRED,
                error.stack);
        };

        default: {
            throw new FlierlyException(
                ERROR_MESSAGES.UNKNOWN_ERROR,
                HttpCodes.UNAUTHORIZED,
                ERROR_MESSAGES.UNKNOWN_ERROR,
                error.stack);
        }
    }
}

