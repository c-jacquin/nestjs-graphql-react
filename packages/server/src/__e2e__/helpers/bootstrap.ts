import { TestingModule, Test } from '@nestjs/testing';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

import { AppModule, prepareApp } from 'app.module';

interface IBootstrapE2eOptions {
  http?: boolean;
}

const { PORT, HOST } = process.env;

export async function bootstapE2eApp(options: IBootstrapE2eOptions = {}) {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const expressApp = new ExpressAdapter(express());
  // const httpServer = http.createServer(expressApp);
  const nestApp = moduleFixture.createNestApplication(
    options.http && expressApp,
  );
  prepareApp(nestApp);

  await nestApp.init();

  if (options.http)
    await new Promise(res => expressApp.listen(Number(PORT), HOST, res));

  return {
    nestApp,
    expressApp,
  };
}
