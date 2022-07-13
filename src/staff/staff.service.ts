import { ForbiddenException, Injectable, InternalServerErrorException, BadRequestException, UseGuards, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Staff } from './dto';
import { verify, hash } from "argon2";
import { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


function role_detector(role: string): Role {
    switch (role) {
        case "ADMIN":
            return Role.ADMIN;
        case "CHEF":
            return Role.CHEF;
        case "GARSON":
            return Role.GARSON;
        default:
            throw new BadRequestException();
    }
}

@Injectable()
export class StaffService {
    constructor(private db: DbService, private jwt: JwtService) {

    }

    async create_token(payload: any) {
        return await this.jwt.signAsync(payload);
    }
    async create_staff(body: Staff) {
        const pass_hash = await hash(body.password);//TODO : use a better strategy
        try {
            let user = await this.db.staff.create({
                data: {
                    name: body.name,
                    email: body.email,
                    role: Role.ADMIN,
                    picture: "",
                    password: pass_hash

                }
            });
            const { password, ...res } = user
            return res;

        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code == "P2002") {
                throw new ForbiddenException("Credentials taken");
            } else {
                throw new InternalServerErrorException();
            }

        }
    }

    async signin(body: any, res: Response) {
        const { email, password } = body;
        try {
            const user = await this.db.staff.findUnique({ where: { email } });
            if (await verify(user.password, password)) {
                const token = await this.create_token({ body, role: user.role });
                res.cookie("Authorization", token, {
                    maxAge: 60 * 60 * 12 * 1000,
                    sameSite: 'strict',
                    httpOnly: true
                });
                return { access_token: token, success: true };
            } else {
                throw new NotFoundException();
            }

        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code == "P2018") {
                throw new ForbiddenException("Credentials taken");
            } else if (err instanceof NotFoundException) { throw err } else {
                throw new InternalServerErrorException();
            }
        }
    }


}
