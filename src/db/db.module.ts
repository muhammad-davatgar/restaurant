import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DbService],
  exports: [DbService]
})
export class DbModule { }
