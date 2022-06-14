import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { SignalwireService } from './signalwire.service';
// import { CreateBookDTO } from './dto/create-book.dto';

// @Controller('signalwire')
// export class SignalwireController {}

@Controller('signalwire')
export class SignalwireController {
  constructor(private signalWireService: SignalwireService) {}

  @Get()
  async getRooms() {
    const rooms = await this.signalWireService.getRooms();
    return rooms;
  }
}
