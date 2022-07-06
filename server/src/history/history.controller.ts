import { Controller, Get } from '@nestjs/common';
import {
  VideoHistoryEntity,
  VoiceHistoryEntity,
  MessageHistoryEntity,
  FaxHistoryEntity,
} from 'src/history/history.entity';
import { HistoryService } from 'src/history/history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get('/')
  async getHistory() {
    const videoHistory: VideoHistoryEntity[] =
      await this.historyService.getVideoHistory();
    const videoCallCharge = videoHistory.reduce(
      (prevVal, currentHistoryItem) => currentHistoryItem.charge + prevVal,
      0,
    );

    const voiceHistory: VoiceHistoryEntity[] =
      await this.historyService.getVoiceHistory();
    const voiceCallCharge = voiceHistory.reduce(
      (prevVal, currentHistoryItem) => prevVal + currentHistoryItem.charge,
      0,
    );

    const messageHistory: MessageHistoryEntity[] =
      await this.historyService.getMessageHistory();
    const messageCallCharge = messageHistory.reduce(
      (prevVal, currentHistoryItem) => prevVal + currentHistoryItem.charge,
      0,
    );

    const faxHistory: FaxHistoryEntity[] =
      await this.historyService.getFaxHistory();
    const faxCallCharge = faxHistory.reduce(
      (prevVal, currentHistoryItem) => prevVal + currentHistoryItem.charge,
      0,
    );

    return {
      summary: {
        video: {
          calls: videoHistory.length,
          totalCharge: videoCallCharge,
        },
        voice: {
          calls: voiceHistory.length,
          totalCharge: voiceCallCharge,
        },
        messaging: {
          calls: messageHistory.length,
          totalCharge: messageCallCharge,
        },
        fax: {
          calls: faxHistory.length,
          totalCharge: faxCallCharge,
        },
      },
      video: videoHistory,
      voice: voiceHistory,
      messaging: messageHistory,
      fax: faxHistory,
    };
  }
}
