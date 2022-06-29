import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PalapasModule } from './palapas/palapas.module';
import { UsersModule } from './users/users.module';
import { PalapasController } from './palapas/palapas.controller';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PalapasModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
