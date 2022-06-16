import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignalwireService } from 'src/signalwire/signalwire.service';

@Module({
  imports: [ConfigModule],
  providers: [SignalwireService],
  exports: [SignalwireService],
})
export class SignalwireModule {}
