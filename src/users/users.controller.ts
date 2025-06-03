import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRoleEnum from './enums/userRoleEnum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createUser = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'User created successfully',
      data: createUser,
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('role') role: UserRoleEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const users = await this.usersService.findAll(role, limit, page);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: users,
      message: 'All users fetched successfully',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
      message: 'User fetched successfully',
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.update(+id, updateUserDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
      message: 'User updated successfully',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.remove(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'User deleted successfully',
    });
  }
}
