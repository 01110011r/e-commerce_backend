import { ApiProperty } from "@nestjs/swagger";

export class AddOrderDTO {
    @ApiProperty()
    productId: string;
    // products:{
    @ApiProperty()
    quantity: number;
// }[];
}