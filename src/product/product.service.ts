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
import { QueryProductDto } from './dto/query-product.dto';


@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Products') private productModel: Model<ProductType>,
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async findProducts(ids:Array<string>) {
        return await this.productModel.find({_id: { $in: ids }}).exec();
    }

    async ShowAll(query: QueryProductDto) {

        const queryObj = {};

        if(query.title) {
            queryObj['title'] = {$regex: query.title, $options: 'i'};
        }

        const limit = query.limit ? Number(query.limit) : 10;
        const skip = query.page ? (Number(query.page) - 1) * limit : 0;

        return await this.productModel.find(queryObj)
          .limit(limit)
          .skip(skip)
          .populate('ownerId', '-password').exec();
    }

    async ShowOne(id:string) {
        return await this.productModel.findById(id).populate('ownerId', '-password').exec();
    }

    async Create(createProductDTO: CreateProductDTO, token: string, image: Express.Multer.File) {
console.log(token);

        const username = this.jwtService.decode(token)?.username;

        if (!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }
        const user = await this.userService.findByUsername(username);

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // createProductDTO.owner = user;
        if(image?.filename) createProductDTO.img = image.filename;

        const product = await this.productModel.findOne({title: createProductDTO.title});

        if(product&&product.title===createProductDTO.title&&product.owner._id===user._id) {

            createProductDTO.quantity+=Number(product.quantity)

            return await this.productModel.findOneAndUpdate(product._id, createProductDTO);
        }

        return await this.productModel.create({...createProductDTO, owner: user});
    }


    async Update(id:string, updateProductDTO: UpdateProductDTO, img: Express.Multer.File, token: string) {

        const username = this.jwtService.decode(token)?.username;

        if(!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.findByUsername(username);

        const product = await this.productModel.findById(id);

        if(user?._id != product?.owner.id.toString()) {
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

        return this.productModel.findByIdAndUpdate(id, updateProductDTO);

    }


    async Delete(id: string, token: string) {
        const username = this.jwtService.decode(token)?.username;

        if(!username) {
            throw new HttpException('Invalid or expired token provided.', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.findByUsername(username);

        const product = await this.productModel.findById(id);

        if(user?._id != product?.owner.id.toString()) {
            throw new HttpException('You are not the owner of this product.', HttpStatus.BAD_REQUEST);
        }

        return this.productModel.findByIdAndDelete(id);

    }

}