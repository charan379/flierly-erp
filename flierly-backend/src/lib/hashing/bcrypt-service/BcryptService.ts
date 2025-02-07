
export interface BcryptService {
    generateHash(plainString: string): Promise<string>;
    validateHash(plainString: string, hashedString: string): Promise<boolean>
}