import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "src/Models/product.schema";
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from '../Models/user.schema';



@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Products",
                schema: ProductSchema
            }
        ]),
      SharedModule,
      JwtModule
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}