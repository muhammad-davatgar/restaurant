import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(private jwt: JwtService, config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT")
        });
    }

    async create_staff_token(payload: any) {
        const token = await this.jwt.signAsync(payload);
        return { access_token: token };
    }



    async validate(arg: any) {
        console.log("he");
        return { username: arg.name, role: arg.role };
    }

}