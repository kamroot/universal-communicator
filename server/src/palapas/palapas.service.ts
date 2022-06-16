import { Injectable } from '@nestjs/common';
import { SignalwireService } from '../signalwire/signalwire.service';

@Injectable()
export class PalapasService {
  constructor(private signalWireService: SignalwireService) {}

  getPalapas(): Promise<any> {
    return this.signalWireService.getRooms();
  }
}
