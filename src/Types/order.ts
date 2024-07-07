import { Document, Types } from "mongoose";
import { ProductType } from "./product";

export interface OrderType extends Document {
ownerId: Types.ObjectId,
products: {
    product: ProductType,
    quantity: Number
}[],
totalPrice: Number
}