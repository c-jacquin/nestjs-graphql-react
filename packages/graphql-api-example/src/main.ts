import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: !!process.env.DEBUG_HTTP }),
  );
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors();
  app.use(helmet());

  await app.listen(config.get('PORT'), '0.0.0.0');
}
bootstrap();
