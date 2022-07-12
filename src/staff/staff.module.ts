import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffJwt } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({ secret: process.env.STAFF_JWT, signOptions: { expiresIn: 60 * 60 * 60 * 12 } })],
    providers: [StaffService, StaffJwt],
    controllers: [StaffController],
    exports: [StaffJwt]
})
export class StaffModule { }
