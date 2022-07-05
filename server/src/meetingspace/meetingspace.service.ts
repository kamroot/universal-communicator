import { Injectable } from '@nestjs/common';
import { SignalwireService } from '../signalwire/signalwire.service';
import { MeetingspaceEntity } from './meetingspace.entity';

@Injectable()
export class MeetingspaceService {
  constructor(private signalWireService: SignalwireService) {}

  async getPalapas(): Promise<MeetingspaceEntity[]> {
    const meetingspaces: MeetingspaceEntity[] = [];

    const rooms = await this.signalWireService.getRooms();
    for (const room of rooms.data) {
      // name and dislay_name are messed up for conferences
      // https://github.com/signalwire/cloud-product/issues/3900

      // lets get a list of pre existing `conferences`. In SignalWire
      // conferences are different from rooms. Conferenes are rooms that have UI
      const p = new MeetingspaceEntity(
        room.display_name,
        room.id,
        room.display_name,
      );
      meetingspaces.push(p);
    }
    return Promise.resolve(meetingspaces);
  }

  async getTicket(meetingspaceName, visitorName): Promise<string> {
    const ticket = this.signalWireService.getToken(
      meetingspaceName,
      visitorName,
    );
    return Promise.resolve(ticket);
  }
}
