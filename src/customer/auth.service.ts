import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthService extends PassportStrategy(Strategy, "customer") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("Authentication"),
            ignoreExpiration: false,
            secretOrKey: process.env.CUSTOMER_JWT,
        });
    }

    validate(payload: any) {
        return payload;
    }
}
