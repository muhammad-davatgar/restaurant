import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { StaffModule } from './staff/staff.module';
import { DbModule } from './db/db.module';
import { CustomerModule } from './customer/customer.module';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StaffModule, DbModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule { }