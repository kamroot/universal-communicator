import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MeetingspaceModule } from './meetingspace/meetingspace.module';
import { UsersModule } from './users/users.module';
// import { MeetingspaceController } from './meetingspace/meetingspace.controller';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MeetingspaceModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
