import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetTicketDTO } from 'src/meetingspace/dto/get-ticket.dto';
import { MeetingspaceEntity } from 'src/meetingspace/meetingspace.entity';
import { MeetingspaceService } from './meetingspace.service';

@Controller('meetingspace')
export class MeetingspaceController {
  constructor(private meetingspaceService: MeetingspaceService) {}

  @Get()
  async getRooms() {
    const rooms: MeetingspaceEntity[] =
      await this.meetingspaceService.getPalapas();
    return rooms;
  }

  @Post('/token')
  async getTicket(@Body() getTicketDTO: GetTicketDTO) {
    const { meetingspaceName, visitorName } = getTicketDTO;
    const ticket = this.meetingspaceService.getTicket(
      meetingspaceName,
      visitorName,
    );
    return ticket;
  }
}
