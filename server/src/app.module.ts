import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PubsubGateway } from './pubsub.gateway';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, ChannelsModule],
  controllers: [AppController],
  providers: [AppService, PubsubGateway],
})
export class AppModule {}
