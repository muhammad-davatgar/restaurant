import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
import { DbModule } from './db/db.module';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StaffModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }