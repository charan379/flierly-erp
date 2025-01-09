
export interface AuthenticateUserRequestBody {
    username: string,
    password: string,
    remember: boolean,
};

export interface UpdateUserPasswordRequestBody {
    userId: number,
    password: string,
}