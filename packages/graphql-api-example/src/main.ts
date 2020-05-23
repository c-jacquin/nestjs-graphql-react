import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { Env } from '@shared';
import { ExpiredAccessTokenFilter } from 'auth/exceptions/expired-access-token.filter';
import { AppModule } from 'app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const expiredAccessTokenFilter = app.get(ExpiredAccessTokenFilter);

  app.enableCors();
  app.use(helmet());
  app.useGlobalFilters(expiredAccessTokenFilter);

  await app.listen(config.get(Env.PORT), config.get(Env.HOST));
}
bootstrap();
