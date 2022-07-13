import { IsEmail, isNotEmpty, IsNotEmpty, Length, } from "class-validator";


export class SignUp {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @Length(10, 20)
    password: string;
    @IsNotEmpty()
    name: string;
}


export class SignIn {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @Length(10, 20)
    password: string;
}