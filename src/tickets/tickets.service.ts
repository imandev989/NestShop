import { Injectable } from '@nestjs/common';
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
    const { userId, replyTo, ...TicketDto } = createTicketDto;
    const user = await this.userService.findOne(userId);
    let replyToTicket = null;
    if (replyTo) {
      replyToTicket = await this.ticketRepository.findOneByOrFail({
        id: replyTo,
      });
    }
    const ticket = this.ticketRepository.create({
      ...TicketDto,
      user,
      replyTo: replyToTicket,
    });
    return this.ticketRepository.save(ticket);
  }

  // findAll() {
  //   return `This action returns all tickets`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} ticket`;
  // }

  // update(id: number, updateTicketDto: UpdateTicketDto) {
  //   return `This action updates a #${id} ticket`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} ticket`;
  // }
}
