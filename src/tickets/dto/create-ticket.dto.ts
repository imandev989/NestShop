import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString({ message: 'title must be stirng' })
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @IsString({ message: 'subject msut be string' })
  @IsNotEmpty({ message: 'subject is required' })
  subject: string;

  @IsString({ message: 'description must be string' })
  @IsNotEmpty({ message: 'desc is required' })
  description: string;

  @IsNotEmpty({ message: 'user is required' })
  userId: number;
  @IsOptional()
  replyTo: number;
}
