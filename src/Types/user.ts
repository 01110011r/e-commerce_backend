import { Document } from "mongoose";

export interface UserType extends Document {
    username: String,
    readonly password: String
}