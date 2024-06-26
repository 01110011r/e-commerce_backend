import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/create-product.dto";


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}


    @Post('create')
    async Create(@Body() createProductDTO: CreateProductDTO) {
        return await this.productService.Create(createProductDTO);
    }

    @Get('all')
    ShowAll() {
        
    }
}