import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UsersService,
  ) {}
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    try {
      const { userId, replyTo, ...TicketDto } = createTicketDto;

      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      let replyToTicket: Ticket | null = null;

      if (replyTo) {
        replyToTicket = await this.ticketRepository.findOne({
          where: { id: replyTo },
          relations: ['replyTo'],
        });

        if (!replyToTicket) {
          throw new NotFoundException('Reply target ticket not found');
        }

        if (replyToTicket.replyTo) {
          throw new BadRequestException('Cannot reply to a reply');
        }
      }

      const ticket = this.ticketRepository.create({
        ...TicketDto,
        user,
        ...(replyToTicket ? { replyTo: replyToTicket } : {}),
      });

      return await this.ticketRepository.save(ticket);
    } catch (error) {
      // Optional: log error for debugging
      if (error instanceof Error) {
        console.error('Error creating ticket:', error.message);
      } else {
        console.error('Error creating ticket:', error);
      }
      throw error;
    }
  }
  async findAll() {
    const tickets = await this.ticketRepository
      .createQueryBuilder('tickets')
      .where('tickets.replyTo IS NULL')
      .getMany();

    return tickets;
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOneOrFail({
      where: { id },
      relations: ['replies', 'replyTo'],
    });
    return ticket;
  }

  // update and remove methods can be added here
}
