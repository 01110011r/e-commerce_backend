import { Controller, Headers, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderAddDTO } from "./dto/order-add.dto";



@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService
    ) {}


    @Post()
    AddOrder(order: OrderAddDTO, @Headers('authorization') authToken: string) {
        return this.orderService.AddOrder(order, authToken);
    }


}