import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class AddOrderDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;
    @ApiProperty()
    @IsNumber()
    quantity: number;
}