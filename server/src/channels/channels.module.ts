import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';

@Module({
  imports: [HttpModule],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class ChannelsModule {}
