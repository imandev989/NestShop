import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import UserRoleEnum from '../enums/userRoleEnum';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'display name is required' })
  @IsString({ message: 'display name must be a string' })
  display_name?: string;

  @IsEnum(UserRoleEnum, {
    message: 'role must be either user, admin or superAdmin',
  })
  @IsOptional()
  role!: UserRoleEnum;
}
