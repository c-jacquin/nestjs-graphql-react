import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import helmet from 'helmet';

import { AppModule } from './app.module';

const IS_PROD = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: !IS_PROD }));
  app.enableCors();
  app.use(helmet());

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0');
}
bootstrap();
