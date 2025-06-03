import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;
  @IsString({ message: 'province must be a string' })
  @IsNotEmpty({ message: 'province is required' })
  province: string;

  @IsString({ message: 'city must be a string' })
  @IsNotEmpty({ message: 'city is required' })
  city: string;

  @IsString({ message: 'postal code must be a string' })
  @Length(10, 10, { message: 'postal code must be 10 characters' })
  postal_code: string;

  @IsString({ message: 'address must be a string' })
  @IsNotEmpty({ message: 'address is required' })
  address: string;

  @IsString({ message: 'reciver mobile must be a string' })
  @Length(11, 11, { message: 'reciver mobile must be 11 characters' })
  reciver_mobile: string;

  @IsOptional({ message: 'description is optional' })
  @IsString({ message: 'description must be a string' })
  description: string;
}
