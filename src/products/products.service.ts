import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      title,
      price,
      description,
      stock,
      categoryIds = [],
    } = createProductDto;

    const product = await this.productRepository.create({
      title,
      price,
      description,
      stock,
    });

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(Array.isArray(categoryIds) ? categoryIds : [categoryIds]),
      });
      product.categories = categories;
    }
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['categories'] });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { title, price, description, stock, categoryIds } = updateProductDto;
    const product: Product = await this.findOne(id);
    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    if (stock) product.stock = stock;
    if (categoryIds) {
      const categories = await this.categoryRepository.find({
        where: {
          id: In(Array.isArray(categoryIds) ? categoryIds : [categoryIds]),
        },
      });
      product.categories = categories;
    }

    return await this.productRepository.save(product);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}
