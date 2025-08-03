import { IsNotEmpty, IsString, Length, Matches } from "class-validator";


export default class UserCredentialsDTO {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,26})$/)
    @Length(8, 26)
    password: string;
}