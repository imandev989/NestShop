import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Res,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.create(createProductDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'product created successfully',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'product finded succssfully',
    });
  }
}
