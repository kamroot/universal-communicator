import { Module } from '@nestjs/common';
import { SignalwireModule } from 'src/signalwire/signalwire.module';
import { MeetingspaceController } from './meetingspace.controller';
import { MeetingspaceService } from './meetingspace.service';

@Module({
  imports: [SignalwireModule],
  controllers: [MeetingspaceController],
  providers: [MeetingspaceService],
})
export class MeetingspaceModule {}
