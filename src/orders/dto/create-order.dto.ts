import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsNumber({}, { message: 'User ID must be a number' })
  userId: number;

  @IsEnum(OrderStatus, { message: 'Order status must be a valid enum value' })
  @IsOptional()
  status?: OrderStatus;

  @IsDateString({}, { message: 'Payment time must be a valid date' })
  @IsOptional()
  payed_time?: Date;

  @IsNumber({}, { message: 'Address ID must be a number' })
  addressId: number;

  @IsNumber({}, { message: 'Total price must be a number' })
  total_price: number;

  @IsString({ message: 'Discount code must be a string' })
  @IsOptional()
  discount_code?: string;

  @IsArray({ message: 'Order items must be sent as an array' })
  @ValidateNested({ each: true, message: 'Each order item must be valid' })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
