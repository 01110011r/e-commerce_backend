import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { OrderType } from "src/Types/order";
import { OrderAddDTO } from "./dto/order-add.dto";
import { ProductService } from "src/product/product.service";



@Injectable()
export class OrderService {
constructor(
    @InjectModel("Orders") private orderModel: Model<OrderType>,
    private productService: ProductService
) {}


private async CalcTotalPrice(order: OrderAddDTO) {
    let totalePrice = 0;
    const ids = [],
    quantities = [];
    for (const p of order.products) {
      ids.push(new Types.ObjectId(p.productId));
      quantities.push(Number(p.quantity));
    }

    const Products = await this.productService.findProducts(ids);
    if(Products.length != quantities.length) {
        throw new HttpException('Product not found :(', HttpStatus.BAD_REQUEST);
    }
    for (let i = 0; i<Products.length; i ++) {
        totalePrice += Number(Products[i]) * Number(quantities[i]);
    }
    return totalePrice;

}

async AddOrder(order: OrderAddDTO, token: string) {
    // const totalPrice
}

}