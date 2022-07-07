import { NestFactory } from '@nestjs/core';
import { MiddlewareConsumer } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(LoggerService));
  // app.forRoutes('*', loggerMiddleware);

  const confService = app.get(ConfigService);

  const port = confService.get('SERVER_PORT', '0.0.0.0');
  console.log(`Server listening on port ${port}`);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
