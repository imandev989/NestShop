import { IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(11, 11, { message: 'mobile number must be 11 characters' })
  @Matches(/^[0-9]{11}$/, { message: 'mobile number must be numeric' })
  mobile: string;
  display_name: string;
  password: string;
  role: string;
}
