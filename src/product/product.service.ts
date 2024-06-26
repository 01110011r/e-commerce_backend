import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductType } from "src/Types/product";
import { CreateProductDTO } from "./dto/create-product.dto";


@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Product') private productModel: Model<ProductType>
    ) {}

    async Create(createProductDTO: CreateProductDTO) {
        return await this.productModel.create(createProductDTO)
    }

}