import { Controller, Get } from '@nestjs/common';
import { HistoryLine } from 'src/history/history.entity';
import { HistoryService } from 'src/history/history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get('/')
  async getHistory() {
    const history: HistoryLine[] = await this.historyService.getVideoHistory();
    return history;
  }
}
