import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;
    description: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    img: string;

    @ApiProperty()
    @IsNotEmpty()
    measurement: ['countable', 'kg', 'm'];

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // owner: string;
}