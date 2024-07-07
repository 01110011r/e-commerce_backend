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


private async CalcTotalPrice(order: AddOrderDTO) {
    let totalPrice = 0;
    const ids = [],
    quantities = [];
    for (const p of order.products) {
      ids.push(new Types.ObjectId(p.productId));
      quantities.push({productId: new Types.ObjectId(p.productId) ,quantity:Number(p.quantity)});
    }

    const foundProducts = await this.productService.findProducts(ids);
    if(foundProducts.length != quantities.length) {
        throw new HttpException('Product not found :(', HttpStatus.BAD_REQUEST);
    }
    for (let i = 0; i<foundProducts.length; i ++) {
        for(let j = 0; j<quantities.length; j++) {

            if(foundProducts[i]?._id == quantities[j]?.productId) {
                totalPrice += Number(foundProducts[i].price) * Number(quantities[j].quantity);
            }
        }
    }
console.log(totalPrice)
    return [totalPrice, foundProducts];

}

async AddOrder(order: AddOrderDTO, token: string) {
    const username = await this.jwtService.decode(token)?.username;
    const customer = await this.userService.findByUsername(username);

    // if(!customer) {
    //     throw new HttpException('Unauthorized :(', HttpStatus.UNAUTHORIZED)
    // }

    // const [totalPrice, foundProducts] = await this.CalcTotalPrice(order);

    // return await this.orderModel.create({ownerId: customer._id, products: foundProducts, totalPrice})
}

}