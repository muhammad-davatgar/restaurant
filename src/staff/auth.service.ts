import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";



@Injectable()
export class StaffJwt extends PassportStrategy(Strategy, "staff") {
    constructor(private conf: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.STAFF_JWT,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}