import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class BookmarkProductDto {
  @IsNotEmpty({ message: 'Product ID must not be empty' })
  @IsNumber({}, { message: 'Product ID must be a number' })
  @IsInt({ message: 'Product ID must be an integer' })
  product_id: number;

  @IsNotEmpty({ message: 'User ID must not be empty' })
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsInt({ message: 'User ID must be an integer' })
  user_id: number;
}
