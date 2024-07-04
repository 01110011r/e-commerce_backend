import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductType } from "src/Types/product";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UserService } from '../shared/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateProductDTO } from './dto/update-product.dto';


@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Product') private productModel: Model<ProductType>,
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async ShowAll() {
        return await this.productModel.find().populate('owner', '-password').exec();
    }

    async ShowOne(id:string) {
        return await this.productModel.findById(id).populate('owner', '-password').exec();
    }

    async Create(createProductDTO: CreateProductDTO) {

        const username = this.jwtService.decode(createProductDTO.owner)?.username;
        console.log('service '+username);
        if (!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userService.findByUsername(username);
        console.log('service '+user);
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        createProductDTO.owner = user._id as string;
        console.log('service '+createProductDTO.owner);
        return await this.productModel.create(createProductDTO);
    }


    async Update(id:string, updateProductDTO: UpdateProductDTO) {
        const username = this.jwtService.decode(updateProductDTO.owner)?.username;

        if(!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.findByUsername(username);

        if(user?._id != id) {
            throw new HttpException('You are not the owner of this product', HttpStatus.BAD_REQUEST);
        }

        return await this.productModel.findByIdAndUpdate(id, updateProductDTO);

    }


    async Delete(id: string, token: string) {
        const username = this.jwtService.decode(token)?.username;

        if(!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.findByUsername(username);

        if(user?._id != id) {
            throw new HttpException('You are not the owner of this product.', HttpStatus.BAD_REQUEST);
        }

        return this.productModel.findByIdAndDelete(id);

    }

}