import { Controller, Get } from '@nestjs/common';
import { PalapasService } from './palapas.service';

@Controller('palapas')
export class PalapasController {
  constructor(private palapasService: PalapasService) {}

  @Get()
  async getRooms() {
    const rooms = await this.palapasService.getPalapas();
    return rooms;
  }
}
