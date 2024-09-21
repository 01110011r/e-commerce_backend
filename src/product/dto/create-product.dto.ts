import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    img: string;

    @ApiProperty()
    @IsNotEmpty()
    measurement: ['countable', 'kg', 'm'];

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // owner: string;
}