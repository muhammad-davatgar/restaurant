import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Response } from 'express';
import { Staff, SignIn } from './dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
    constructor(private service: StaffService) {

    }
    @UseGuards(AuthGuard('staff'))
    @Post("create")
    create(@Body() body: Staff) {
        return this.service.create_staff(body);
    }

    @Post("signin")
    signin(@Body() body: SignIn, @Res({ passthrough: true }) res: Response) {
        return this.service.signin(body, res);
    }
}
