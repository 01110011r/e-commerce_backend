import { Body, Controller, Get, Post, Headers, Req, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { Express, Request } from 'express';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'node:path';

@ApiTags('product')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}


    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req: Request<any>, file:Express.Multer.File, cb: any) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                const filename = file.originalname.split('.')[0];
                const extension = path.extname(file.originalname);
                cb(null, `${filename}-${Date.now()}${extension}`);
            }

        })
    }))
    async Create(
      @Body() createProductDTO: CreateProductDTO,
      @Headers('authorization') authToken: string,
      @UploadedFile() image: Express.Multer.File
    ) {
        return await this.productService.Create(createProductDTO, authToken, image);
    }

    @Get('all')
    async ShowAll() {
        return this.productService.ShowAll();
    }

    @Get(':id')
    async ShowOne(@Req() req: Request) {
        return this.productService.ShowOne(req.params.id);
    }

    @Put('update/:id')
    async Update(
      @Req() req: Request,
      @Body() updateProductDTO: UpdateProductDTO,
      @Headers('authorization') authToken: string,
      @UploadedFile() image: Express.Multer.File
    ) {
        return this.productService.Update(req.params.id, updateProductDTO, image, authToken);
    }

    @Delete(':id')
    async Delete(
      @Req() req: Request,
      @Headers('authorization') authToken: string
    ) {
        return this.productService.Delete(req.params.id, authToken);
    }

}