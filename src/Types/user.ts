import { Document } from "mongoose";

export interface UserType extends Document {
    username: string,
    readonly password: string
}