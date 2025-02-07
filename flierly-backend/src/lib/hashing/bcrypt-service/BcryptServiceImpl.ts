import { BcryptService } from "./BcryptService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";
import { inject } from "inversify";
import bcrypt from 'bcryptjs';


export default class BcryptServiceImpl implements BcryptService {

    private readonly saltRounds: number = 10;

    constructor(
        @inject(BeanTypes.LoggerService) private loggerService: LoggerService,
    ) {

    };

    async generateHash(plainString: string): Promise<string> {
        // Validate that the input parameter is a string
        if (typeof plainString !== 'string') {
            throw new Error('Plain string must be a string');
        }
        try {
            // Generate a unique and strong salt
            const salt = await bcrypt.genSalt(this.saltRounds);
            // Hash the plain string using the salt
            const hashedString = await bcrypt.hash(plainString, salt);
            return hashedString;
        } catch (_error) {
            throw new Error('Failed to generate hash');
        }
    };

    async validateHash(plainString: string, hashedString: string): Promise<boolean> {
        // Validate that the input parameters are strings
        if (typeof plainString !== 'string' || typeof hashedString !== 'string') {
            throw new Error('Plain string and hashed string must be strings');
        }

        try {
            // Compare the plain password against the hashed password
            const isMatch: boolean = await bcrypt.compare(plainString, hashedString);
            return isMatch;
        } catch (_error) {
            throw new Error('Failed to validate string hash');
        }
    };

}