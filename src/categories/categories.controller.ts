import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Response } from 'express';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const category = await this.categoriesService.create(createCategoryDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: category,
      message: 'category created successfully',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const categories = await this.categoriesService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: categories,
      message: 'categories fetched successfully',
    });
  }
}
