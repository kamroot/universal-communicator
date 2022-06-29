import { Injectable } from '@nestjs/common';
import { HistoryLine } from 'src/history/history.entity';
import { SignalwireService } from 'src/signalwire/signalwire.service';

@Injectable()
export class HistoryService {
  constructor(private signalWireService: SignalwireService) {}

  async getVideoHistory(): Promise<HistoryLine[]> {
    // const history: HistoryLine[] = [
    //   {
    //     id: '85406845-4fa4-493a-bffb-a4a02dbb1123',
    //     source: 'realtime_api',
    //     type: 'video_conference_session',
    //     name: 'MWGOi0las7FPKQbirfiC',
    //     status: 'completed',
    //     started_at: new Date('2022-06-27T19:34:23.984Z'),
    //     ended_at: new Date('2022-06-27T20:07:43.858Z'),
    //     charge: 0.562572,
    //     created_at: new Date('2022-06-27T19:34:21.682Z'),
    //   },
    // ];
    // return Promise.resolve(history);
    return this.signalWireService.getHistory('video');
  }
}
