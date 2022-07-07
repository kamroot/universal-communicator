import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MeetingspaceModule } from './meetingspace/meetingspace.module';
import { UsersModule } from './users/users.module';
// import { MeetingspaceController } from './meetingspace/meetingspace.controller';
import { HistoryModule } from './history/history.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MeetingspaceModule,
    HistoryModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
