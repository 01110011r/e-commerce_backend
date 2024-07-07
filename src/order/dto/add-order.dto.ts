import { ApiProperty } from "@nestjs/swagger";

export class AddOrderDTO {
    @ApiProperty({
        default:{
            productId: "",
            quantity: 1
        }
    })
    products:{
    productId: string;
    quantity: number;
}[];
}