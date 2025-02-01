import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  //   Matches,
  MinLength,
} from 'class-validator';
import UserRoleEnum from '../enums/userRoleEnum';

export class CreateUserDto {
  @IsString({ message: 'mobile number must be a string' })
  @Length(11, 11, { message: 'mobile number must be 11 characters' })
  @Matches(/^[0-9]{11}$/, { message: 'mobile number must be numeric' })
  @IsNotEmpty({ message: 'mobile number is required' })
  @Transform(({ value }) => value.trim())
  mobile: string;

  @IsNotEmpty({ message: 'display name is required' })
  @IsString({ message: 'display name must be a string' })
  display_name: string;

  @IsString({ message: 'password must be a string' })
  @IsOptional()
  @MinLength(8, { message: 'password must be at least 8 characters' })
  //   @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsEnum(UserRoleEnum, {
    message: 'role must be either user, admin or superAdmin',
  })
  @IsOptional()
  role: UserRoleEnum;
}
