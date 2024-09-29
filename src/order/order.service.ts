import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model, Types } from "mongoose";
import { OrderType } from "src/Types/order";
import { AddOrderDTO } from "./dto/add-order.dto";
import { ProductService } from "src/product/product.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/shared/user.service";
import { transaction } from "src/lib/transaction";



@Injectable()
export class OrderService {
constructor(
    @InjectModel("Orders") private orderModel: Model<OrderType>,
    private productService: ProductService,
    private jwtService: JwtService,
    private userService: UserService,
    @InjectConnection() private connection: Connection
) {}


private async CalcTotalPrice(orders: AddOrderDTO[]) {
    let totalPrice = 0;
    const ids = [],
    properties:{productId: string, quantity:number}[] = [];
    for (let i=0; i<orders.length; i++) {
      ids.push(new Types.ObjectId(orders[i].productId));
      properties.push({productId: orders[i].productId, quantity:Number(orders[i].quantity)||1});
    }
    
    const foundProducts = await this.productService.findProducts(ids);//find all ardered products
    
    if(foundProducts.length != properties.length) {
        throw new HttpException('Product not found :(', HttpStatus.BAD_REQUEST);
    }

    for (let i = 0; i<foundProducts.length; i ++) {
        for(let j = 0; j<properties.length; j++) {
            if(foundProducts[i]?._id == properties[j]?.productId) {
                totalPrice += Number(foundProducts[i].price) * Number(properties[j].quantity);
                foundProducts[i].quantity = Number(foundProducts[i].quantity) - properties[j].quantity;
                this.productService.updateQuantity(foundProducts[i]._id as string, foundProducts[i].quantity);
            }
        }
    }
    return [totalPrice, foundProducts];

}

async AddOrder(orders: AddOrderDTO[], token: string) {
    const username = await this.jwtService.decode(token)?.username;
    const customer = await this.userService.findByUsername(username);

    if(!customer) {
        throw new HttpException('Unauthorized :(', HttpStatus.UNAUTHORIZED)
    }

    const [totalPrice, foundProducts] = await this.CalcTotalPrice(orders);
// console.log(foundProducts);

    return transaction(this.connection, (session) => {
        const newOrder = new this.orderModel({ownerId: customer._id, products: orders, totalPrice});
        return newOrder.save({session});
    });
    // await this.orderModel.create({ownerId: customer._id, products: orders, totalPrice});
}

}