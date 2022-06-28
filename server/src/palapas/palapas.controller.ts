import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetTicketDTO } from 'src/palapas/dto/get-ticket.dto';
import { Palapa } from 'src/palapas/palapa.entity';
import { PalapasService } from './palapas.service';

@Controller('palapas')
export class PalapasController {
  constructor(private palapasService: PalapasService) {}

  @Get()
  async getRooms() {
    const rooms: Palapa[] = await this.palapasService.getPalapas();
    return rooms;
  }

  @Post('/token')
  async getTicket(@Body() getTicketDTO: GetTicketDTO) {
    const { palapaName, visitorName } = getTicketDTO;
    // console.log(`Entering getTicket with ${palapaName} and ${visitorName}`);
    const ticket = this.palapasService.getTicket(palapaName, visitorName);
    return ticket;
  }
}
