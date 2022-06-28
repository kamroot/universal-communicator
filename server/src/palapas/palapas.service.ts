import { Injectable } from '@nestjs/common';
import { SignalwireService } from '../signalwire/signalwire.service';
import { Palapa } from './palapa.entity';

@Injectable()
export class PalapasService {
  constructor(private signalWireService: SignalwireService) {}

  async getPalapas(): Promise<Palapa[]> {
    const palapas: Palapa[] = [];

    const rooms = await this.signalWireService.getRooms();
    for (const room of rooms.data) {
      // name and dislay_name are messed up for conferences
      // https://github.com/signalwire/cloud-product/issues/3900

      // lets get a list of pre existing `conferences`. In SignalWire
      // conferences are different from rooms. Conferenes are rooms that have UI
      const p = new Palapa(room.display_name, room.id, room.display_name);
      palapas.push(p);
    }
    return Promise.resolve(palapas);
  }

  async getTicket(palapaName, visitorName): Promise<string> {
    const ticket = this.signalWireService.getToken(palapaName, visitorName);
    return Promise.resolve(ticket);
  }
}
