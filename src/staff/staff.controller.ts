import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Staff } from './dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
    constructor(private service: StaffService) {

    }
    @Post("create")
    create(@Body() body: Staff) {
        console.log("body : ", body);
        return this.service.create_staff(body);

    }

    @Post("signin")
    signin(@Body() body: any) {
        return this.service.signin(body)
    }
}
