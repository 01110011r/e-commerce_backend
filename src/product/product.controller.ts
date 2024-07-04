import { Body, Controller, Get, Post, Headers, Req, Put, Delete } from '@nestjs/common';
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { Request } from 'express';
import { UpdateProductDTO } from './dto/update-product.dto';


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}


    @Post('create')
    async Create(@Body() createProductDTO: CreateProductDTO, @Headers('authorization') authToken: string) {
console.log('controller '+authToken)
        createProductDTO.owner = authToken;
        return await this.productService.Create(createProductDTO);
    }

    @Get('all')
    async ShowAll() {
        return this.productService.ShowAll();
    }

    @Get(':id')
    async ShowOne(@Req() req: Request) {
        return this.productService.ShowOne(req.params.id);
    }

    @Put(':id')
    async Update(@Req() req: Request, @Body() updateProductDTO: UpdateProductDTO, @Headers('authorization') authToken: string) {
        updateProductDTO.owner = authToken;
        return this.productService.Update(req.params.id, updateProductDTO);
    }

    @Delete(':id')
    async Delete(@Req() req: Request, @Headers('authorization') authToken: string) {
        return this.productService.Delete(req.params.id, authToken);
    }

}