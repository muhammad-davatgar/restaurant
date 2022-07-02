import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Staff } from './dto';
import { hash } from "argon2";
import { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


function role_detector(role: string): Role {
    switch (role) {
        case "ADMIN":
            return Role.ADMIN;
        case "CHEF":
            return Role.CHEF;
        case "GARSON":
            return Role.GARSON;
        default:  //TODO : return an error in this case 
            break;
    }
}

// TODO : check for creation permission
@Injectable()
export class StaffService {
    constructor(private db: DbService) {

    }

    async create_staff(body: Staff) {
        const pass_hash = await hash(body.password);//TODO : use a better strategy
        console.log("staff : ", body);
        try {
            let user = await this.db.staff.create({
                data: {
                    name: body.name,
                    email: body.email,
                    role: Role.ADMIN,
                    picture: body.picture,
                    password: pass_hash

                }
            });
            return user;

        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code == "P2002")
                    throw new ForbiddenException("Credentials taken");
                else
                    throw new InternalServerErrorException();

            } else {
                throw new InternalServerErrorException();
            }

        }
    }

    async signin(body: any) {

    }

}
