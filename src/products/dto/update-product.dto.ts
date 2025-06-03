import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';
// import { Category } from 'src/categories/entities/category.entity';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsArray()
  @IsOptional()
  categoryIds?: number;
}
