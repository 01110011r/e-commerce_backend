import { ApiProperty } from "@nestjs/swagger";

export class QueryProductDto {
  @ApiProperty({
    default:null,
    description: 'Search by title',
    required: false,
    type: String
  })
  title: {
    type: string;
    default: null;
  };

  @ApiProperty({
    description: 'Limit for pagination',
    required: false,
    default: 10
  })
  limit: number;

  @ApiProperty({
    description: 'Which page need for you?',
    required: false,
    default: 1
  })
  page: number;

}