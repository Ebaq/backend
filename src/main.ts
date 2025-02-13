import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: 'http://localhost:3000' }));
  await app.listen(3001);
}
bootstrap();
