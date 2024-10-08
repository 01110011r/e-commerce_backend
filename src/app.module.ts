import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads')
    }),
    ConfigModule.forRoot({
      load: [configuration]
    }),
    MongooseModule.forRoot(configuration().db.local_db_url),
    SharedModule,
    AuthModule,
    ProductModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
