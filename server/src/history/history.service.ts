import { Injectable } from '@nestjs/common';
import {
  VideoHistoryEntity,
  VoiceHistoryEntity,
  MessageHistoryEntity,
  FaxHistoryEntity,
} from 'src/history/history.entity';
import { SignalwireService } from 'src/signalwire/signalwire.service';

@Injectable()
export class HistoryService {
  constructor(private signalWireService: SignalwireService) {}

  async getVideoHistory(): Promise<VideoHistoryEntity[]> {
    return this.signalWireService.getHistory('video');
  }

  async getVoiceHistory(): Promise<VoiceHistoryEntity[]> {
    return this.signalWireService.getHistory('voice');
  }

  async getMessageHistory(): Promise<MessageHistoryEntity[]> {
    return this.signalWireService.getHistory('messaging');
  }

  async getFaxHistory(): Promise<FaxHistoryEntity[]> {
    return this.signalWireService.getHistory('fax');
  }
}
