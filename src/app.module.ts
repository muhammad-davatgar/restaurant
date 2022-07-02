import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
// import { BlogModule } from './blog/blog.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [StaffModule, DbModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }