import { Body, Controller, Headers, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AddOrderDTO } from "./dto/add-order.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService
    ) {}


    @Post()
    AddOrder(
        @Body() orders: AddOrderDTO[],
        @Headers('authorization') authToken: string
    ) {
        return this.orderService.AddOrder(orders, authToken);
    }


}