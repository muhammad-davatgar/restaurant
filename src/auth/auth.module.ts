import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [ConfigModule.forRoot(), JwtModule.register({ secret: process.env.JWT, signOptions: { expiresIn: 60 * 60 * 15 } })],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }
