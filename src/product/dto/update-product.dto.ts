import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDTO {
    
    @IsNotEmpty()
    @IsString()
    title: string;
    description: string;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    img: string;

    @IsNotEmpty()
    measurement: ['countable', 'kg', 'm'];

    @IsNotEmpty()
    @IsString()
    owner: string;
}