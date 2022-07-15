import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
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
    // @UseInterceptors(FileInterceptor("file" , { dest: 'uploads/' }))
    upload(@Req() req: Request) {
        console.log(req.user);
        return "hello";
    }
}
