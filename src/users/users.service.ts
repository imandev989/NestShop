import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import UserRoleEnum from './enums/userRoleEnum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const alreadyUser = await this.userRepository.findOneBy({
        mobile: createUserDto.mobile,
      });

      if (alreadyUser) {
        throw new BadRequestException('User with this mobile already exists');
      }

      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error occurred', error);
      }

      throw error;
    }
  }

  async findAll(role?: UserRoleEnum, limit: number = 10, page: number = 1) {
    const query = this.userRepository.createQueryBuilder('users');
    if (role) {
      query.where('role= :role', { role });
    }
    query.skip((page - 1) * limit);
    return await query.getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByMobile(
    mobile: string,
    checkExist: boolean = false,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ mobile: mobile });
    if (!user) {
      if (!checkExist) throw new NotFoundException(`User ${mobile} not found`);
      return null as any; // Handle null case explicitly if checkExist is true
    }
    if (!checkExist)
      if (!user) throw new NotFoundException(`User ${mobile} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    try {
      await this.userRepository.update(id, updateUserDto);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        'We have Problem when update user. please try again',
      );
    }
  }
  // Adds a product to the user's basket
  async addProductToBasket(userId: number, product: any) {
    // Find the user along with basket items
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['basket_items'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Add the product to the basket
    user.basket_items.push(product);

    // Save the updated user
    return await this.userRepository.save(user);
  }

  // Removes a product from the user's basket
  async removeProductFromBasket(userId: number, product: any): Promise<void> {
    // Find the user along with basket items
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['basket_items'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find the index of the product in the basket
    const productIndex = user.basket_items.findIndex(
      (item) => item.id === product.id,
    );

    if (productIndex === -1) {
      throw new NotFoundException('Product not found in the basket');
    }

    // Remove the product from the basket
    user.basket_items.splice(productIndex, 1);

    // Save the updated user
    await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
