import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() // Missing @Entity() decorator added here
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.replies, { nullable: true })
  replyTo: Ticket;

  @OneToMany(() => Ticket, (ticket) => ticket.replyTo)
  replies: Ticket[];
}
