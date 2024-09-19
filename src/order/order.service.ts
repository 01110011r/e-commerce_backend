import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { OrderType } from "src/Types/order";
import { AddOrderDTO } from "./dto/add-order.dto";
import { ProductService } from "src/product/product.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/shared/user.service";



@Injectable()
export class OrderService {
constructor(
    @InjectModel("Orders") private orderModel: Model<OrderType>,
    private productService: ProductService,
    private jwtService: JwtService,
    private userService: UserService
) {}


private async CalcTotalPrice(orders: AddOrderDTO[]) {
    let totalPrice = 0;
    const ids = [],
    properties = [];
    // console.log(orders)
    for (let i=0; i<orders.length; i++) {
        // console.log(orders[i])
      ids.push(new Types.ObjectId(orders[i].productId));
      properties.push({productId: orders[i].productId, quantity:Number(orders[i].quantity)});
    }
// console.log(ids, properties)
    const foundProducts = await this.productService.findProducts(ids);
    if(foundProducts.length != properties.length) {
        throw new HttpException('Product not found :(', HttpStatus.BAD_REQUEST);
    }
    for (let i = 0; i<foundProducts.length; i ++) {
        for(let j = 0; j<properties.length; j++) {
            if(foundProducts[i]?._id == properties[j]?.productId) {
                console.log('???---> '+foundProducts[i]?._id == properties[j]?.productId)
                // console.log(totalPrice)
                totalPrice += Number(foundProducts[i].price) * Number(properties[j].quantity);
            }
        }
    }
console.log(totalPrice)
    return [totalPrice, foundProducts];

}

async AddOrder(orders: AddOrderDTO[], token: string) {
    const username = await this.jwtService.decode(token)?.username;
    const customer = await this.userService.findByUsername(username);

    // console.log(username, customer, token)
    if(!customer) {
        throw new HttpException('Unauthorized :(', HttpStatus.UNAUTHORIZED)
    }

    const [totalPrice, foundProducts] = await this.CalcTotalPrice(orders);

    // console.log(totalPrice, foundProducts)
    return await this.orderModel.create({ownerId: customer._id, products: orders, totalPrice})
}

}