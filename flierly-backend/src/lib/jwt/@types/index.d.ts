import { JwtPayload } from "jsonwebtoken";

// Create a type alias that combines JwtPayload with custom properties
export interface CustomJwtPayload extends JwtPayload {
    username?: string;
    userId?: number;
};