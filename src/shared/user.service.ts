import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "src/Types/user";



@Injectable()
export class UserService {
    constructor (@InjectModel('Users') private userModel: Model<UserType>) {}

    
}