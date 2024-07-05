import { IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    quantity: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    img: string;

    @ApiProperty()
    @IsNotEmpty()
    measurement: ['countable', 'kg', 'm'];

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    owner: string;
}