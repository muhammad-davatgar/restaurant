import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AuthService } from './auth.service';

@Injectable()
export class CustomerService {
    constructor(private auth_service: AuthService, private db: DbService) {

    }

    async signup(body: any) {

    }

    async signin(body: any) {

    }
}
