import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { SignalwireModule } from 'src/signalwire/signalwire.module';

@Module({
  imports: [SignalwireModule],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
