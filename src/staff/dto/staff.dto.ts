import { IsEmail, IsEnum, IsNotEmpty, Length } from "class-validator";


enum Role {
    ADMIN,
    CHEF,
    GARSON
}

export class Staff {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @Length(10, 20)
    password: string;
    @IsNotEmpty()
    name: string;
    @IsEnum(Role)
    role: string
    @IsNotEmpty()
    picture: string
}

export class SignIn {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @Length(10, 20)
    password: string;

}

