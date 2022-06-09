import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cors = require("cors");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = { origin: '*', credentials: true, }
  app.use(cors(corsOptions))
  await app.listen(process.env.PORT || process.env.APP_STARTUP_PORT);
}
bootstrap();
