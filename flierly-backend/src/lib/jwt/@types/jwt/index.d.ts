// types/jwt.d.ts
import 'jsonwebtoken'

declare module 'jsonwebtoken' {
    interface JwtPayload {
        username?: string;
        userId?: number;
    }
}