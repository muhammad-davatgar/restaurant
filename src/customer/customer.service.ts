import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CustomerService {
    constructor(private db: DbService, private jwt: JwtService) {

    }

    async create_token(payload: any) {
        const token = await this.jwt.signAsync(payload);
        return token;
    }

    async signup(body: any) {
        const pass_hash = await hash(body.password);
        try {
            let user = await this.db.customer.create({
                data: {
                    name: body.name,
                    email: body.email,
                    picture: "",
                    password: pass_hash

                }
            });
            const { password, ...res } = user;
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
            const user = await this.db.customer.findUnique({ where: { email } });
            if (await verify(user.password, password)) {
                const token = await this.create_token({ email });
                res.cookie("auth", token, {
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
