import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Res,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Response } from 'express';
import { UpdateProductDto } from './dto/update-product.dto';
import { BookmarkProductDto } from './dto/bookmark-product.dto';

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

  @Post('bookmark-prodcut')
  async bookmarkProduct(
    @Body() bookmarkProduct: BookmarkProductDto,
    @Res() res: Response,
  ) {
    const bookmarkData = await this.productsService.toggleBookmark(
      bookmarkProduct.user_id,
      bookmarkProduct.product_id,
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: bookmarkData,
      message: ' Prdocut saved to bookmark successfully',
    });
  }
  @Post('add-basket')
  async addItemToBasket(
    @Body() bookmarkProduct: BookmarkProductDto,
    @Res() res: Response,
  ) {
    const bookmarkData = await this.productsService.addItemToBasket(
      bookmarkProduct.user_id,
      bookmarkProduct.product_id,
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: bookmarkData,
      message: ' Product added to basket successfully',
    });
  }

  @Post('remove-basket')
  async removeItemFromBasket(
    @Body() bookmarkProduct: BookmarkProductDto,
    @Res() res: Response,
  ) {
    await this.productsService.removeItemFromBasket(
      bookmarkProduct.user_id,
      bookmarkProduct.product_id,
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: ' Product removed from basket successfully',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: products,
      message: 'Products retrieved successfully',
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.update(+id, updateProductDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'product updated successfully',
    });
  }
}
