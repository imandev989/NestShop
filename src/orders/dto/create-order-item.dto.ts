import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Product ID cannot be empty' })
  productId: number;
}
