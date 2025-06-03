import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'mobile number must be a string' })
  @IsNotEmpty({ message: 'mobile number is required' })
  @Matches(/^[0-9]{11}$/, { message: 'mobile number must be numeric' })
  @Transform(({ value }) => value.trim())
  mobile: string;

  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(8, { message: 'password must be at least 8 characters' })
  @MaxLength(16, { message: 'password must be at most 16 characters' })
  password: string;

  @IsString({ message: 'display name must be a string' })
  @IsNotEmpty({ message: 'display name is required' })
  display_name: string;
}
