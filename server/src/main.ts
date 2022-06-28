import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const confService = app.get(ConfigService);

  const port = confService.get('SERVER_PORT', '0.0.0.0');
  console.log(`Server listening on port ${port}`);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
