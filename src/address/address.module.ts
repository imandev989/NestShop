import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entities/address.entity';
import { User } from '../users/entities/user.entity'; // Adjust import if necessary

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService], // Optional: If you need to use AddressService elsewhere
})
export class AddressModule {}
