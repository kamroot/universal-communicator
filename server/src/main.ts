import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';

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
  const config = new DocumentBuilder()
    .setTitle('SignalWire API')
    .setDescription('SignalWire Play')
    .setVersion('1.0')
    .addTag('signalwire')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
