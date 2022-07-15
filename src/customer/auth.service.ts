import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class AuthService extends PassportStrategy(Strategy, "customer") {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.CUSTOMER_JWT,
        });
    }

    validate(payload: any) {
        return payload;
    }
}

var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['auth'];
    }
    return token;
};