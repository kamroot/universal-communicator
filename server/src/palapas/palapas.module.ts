import { Module } from '@nestjs/common';
import { SignalwireModule } from 'src/signalwire/signalwire.module';
import { PalapasController } from './palapas.controller';
import { PalapasService } from './palapas.service';

@Module({
  imports: [SignalwireModule],
  controllers: [PalapasController],
  providers: [PalapasService],
})
export class PalapasModule {}
