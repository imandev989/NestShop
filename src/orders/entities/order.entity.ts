import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Address } from '../../address/entities/address.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'timestamp', nullable: true })
  payed_time: Date;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column({ type: 'bigint' })
  total_price: number;

  @Column({ type: 'varchar', nullable: true })
  discount_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
