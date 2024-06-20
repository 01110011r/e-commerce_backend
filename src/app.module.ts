import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import constants from './auth/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, constants]
    }),
    MongooseModule.forRoot(configuration().db.local_db_url),
    SharedModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
