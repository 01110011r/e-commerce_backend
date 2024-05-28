import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "src/Types/user";
import { AuthDTO } from "./dto/auth-dto";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
    constructor (@InjectModel('Users') private userModel: Model<UserType>) {}

      async create(userDTO: AuthDTO) {
        const {username, password} = userDTO;

        const user = await this.userModel.findOne({username});

        if(user) {
            throw new HttpException('username is already exists', HttpStatus.UNAUTHORIZED)
        }

        const newUser = this.userModel.create(userDTO);

        return newUser;
      }  
}