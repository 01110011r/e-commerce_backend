import { Document } from "mongoose";
import { UserType } from "./user";

export interface ProductType extends Document {
    name: String,
    description: String,
    img: String,
    quantity: Number,
    measurment: ['kg', 'dona'],
    owner: UserType
}