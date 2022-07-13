import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";



@Injectable()
export class StaffJwt extends PassportStrategy(Strategy, "staff") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("Authentication"),
            ignoreExpiration: false,
            secretOrKey: process.env.STAFF_JWT,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}