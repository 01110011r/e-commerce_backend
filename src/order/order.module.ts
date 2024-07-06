import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderSchema } from "src/Models/order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProductModule } from "src/product/product.module";


@Module({
imports:[
    MongooseModule.forFeature([
        {
            name: "Orders",
            schema: OrderSchema
        }
    ]),
    ProductModule
],
controllers: [
    OrderController
],
providers: [
    OrderService
]
})
export class OrderModule {}