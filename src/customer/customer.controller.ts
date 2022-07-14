import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CustomerService } from './customer.service';
import { SignIn, SignUp } from './dto';

@Controller('customer')
export class CustomerController {
    constructor(private customer_service: CustomerService) { }
    @Post("signup")
    signup(@Body() body: SignUp) {
        return this.customer_service.signup(body);
    }
    @Post("signin")
    signin(@Body() body: SignIn, @Res({ passthrough: true }) res: Response) {
        return this.customer_service.signin(body, res);
    }

    @Post("upload")
    @UseGuards(AuthGuard("customer"))
    upload() {
        return "hello";
    }
}
