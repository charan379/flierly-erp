import { JwtPayload } from "jsonwebtoken";

export default interface JwtService {
    generateToken(userId: number, username: string): Promise<string>;
    verifyToken(jwtToken: string): Promise<JwtPayload>;
}