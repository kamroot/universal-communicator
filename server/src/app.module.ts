import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalwireController } from './signalwire/signalwire.controller';
import { SignalwireService } from './signalwire/signalwire.service';
import { ConfigModule } from '@nestjs/config';
import { SignalwireModule } from './signalwire/signalwire.module';


@Module({
  imports: [ConfigModule.forRoot(), SignalwireModule],
  controllers: [AppController, SignalwireController],
  providers: [AppService, SignalwireService],
})
export class AppModule {}
