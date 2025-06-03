import {
  Controller,
  // Get,
  Post,
  Body,
  HttpStatus,
  Res,
  Get,
  Param,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Response } from 'express';
// import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Res() res: Response) {
    const newTicket = await this.ticketsService.create(createTicketDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: newTicket,
      message: 'Ticket created successfully',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const tickets = await this.ticketsService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: tickets,
      message: 'ticket submitted successfully',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const ticket = await this.ticketsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: ticket,
      message: 'ticket found successfully',
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
  //   return this.ticketsService.update(+id, updateTicketDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketsService.remove(+id);
  // }
}
