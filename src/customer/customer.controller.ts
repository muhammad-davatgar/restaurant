import { Body, Controller, Post } from '@nestjs/common';
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
    signin(@Body() body: SignIn) {
        return this.customer_service.signin(body);
    }
}
