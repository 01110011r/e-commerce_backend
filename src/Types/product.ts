import { Document } from "mongoose";
import { UserType } from "./user";

export interface ProductType extends Document {
    title: String,
    description: String,
    img: String,
    quantity: Number,
    price: Number,
    measurment: ['countable', 'kg', 'm'],
    owner: UserType
}