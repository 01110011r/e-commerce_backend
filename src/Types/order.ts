import { Document } from "mongoose";
import { UserType } from "./user";
import { ProductType } from "./product";

export interface OrderType extends Document {
owner: UserType,
products: {
    product: ProductType,
    quantity: Number
}[],
TotalPrice: Number
}