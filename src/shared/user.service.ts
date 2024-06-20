import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "src/Types/user";
import { AuthDTO } from "./dto/auth-dto";


@Injectable()
export class UserService {
    constructor (@InjectModel('User') private userModel: Model<UserType>) {}


    private async omitPassword(username: string) {
return await this.userModel.findOne({username}).select('-password');
    }

      async create(userDTO: AuthDTO) {
        const { username } = userDTO;

        const user = await this.userModel.findOne({username});

        if(user) {
            throw new HttpException('username is already exists', HttpStatus.UNAUTHORIZED)
        }

        const newUser = (await this.userModel.create(userDTO));

        return this.omitPassword(newUser.username);
      }  


      async findByUsername(userDTO: AuthDTO) {
        return this.userModel.findOne({username:userDTO.username});
      }
}