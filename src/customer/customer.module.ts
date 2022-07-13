import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({ secret: process.env.CUSTOMER_JWT, signOptions: { expiresIn: 60 * 60 * 3 } })],
    providers: [CustomerService, AuthService],
    controllers: [CustomerController],
    exports: [AuthService]
})
export class CustomerModule { }
