import UserCredentialsDTO from "../../dto/UserCredentials.dto";


export default interface UserService {
    authenticate(username: string, password: string): Promise<AuthenticatedUser>;
    getPrivilegeCodes(userId: number): Promise<Set<string>>;
    refreshAccessToken(userId: number): Promise<AuthenticatedUser>;
    updatePassword(userId: number, userCredentialsDTO: UserCredentialsDTO): Promise<string>;
}