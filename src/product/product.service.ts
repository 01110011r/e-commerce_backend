import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductType } from "src/Types/product";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UserService } from '../shared/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Express } from 'express';
import * as fs from 'node:fs';


@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Products') private productModel: Model<ProductType>,
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async ShowAll() {
        return await this.productModel.find().populate('owner', '-password').exec();
    }

    async ShowOne(id:string) {
        return await this.productModel.findById(id).populate('owner', '-password').exec();
    }

    async Create(createProductDTO: CreateProductDTO, token: string, image: Express.Multer.File) {

        const username = this.jwtService.decode(token)?.username;

        if (!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userService.findByUsername(username);

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        createProductDTO.owner = user._id as string;
        createProductDTO.img = image.filename;

        return await this.productModel.create(createProductDTO);
    }


    async Update(id:string, updateProductDTO: UpdateProductDTO, img: Express.Multer.File, token: string) {

        const username = this.jwtService.decode(token)?.username;

        if(!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.findByUsername(username);

        const product = await this.productModel.findById(id);

        if(user?._id != product?.owner.toString()) {
            throw new HttpException('You are not the owner of this product', HttpStatus.BAD_REQUEST);
        }

        if(img) {
            const product = await this.productModel.findById(id)
            fs.unlink(`${__dirname}/../../uploads/${product?.img}`, (err) => {
               if (err) {
                   throw new HttpException('File could not be deleted', HttpStatus.BAD_REQUEST)
               }
            });
        updateProductDTO.img = img.filename;
        }

        updateProductDTO.owner= user._id as string;

        return this.productModel.findByIdAndUpdate(id, updateProductDTO);

    }


    async Delete(id: string, token: string) {
        const username = this.jwtService.decode(token)?.username;

        if(!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.findByUsername(username);

        const product = await this.productModel.findById(id);

        if(user?._id != product?.owner.toString()) {
            throw new HttpException('You are not the owner of this product.', HttpStatus.BAD_REQUEST);
        }

        return this.productModel.findByIdAndDelete(id);

    }

}