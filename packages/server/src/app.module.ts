import { Module, ValidationPipe, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { TerminusModule } from '@nestjs/terminus';

import { AuthModule } from '@auth/auth.module';
import { TodoModule } from '@todo/todo.module';
import configOptions from 'config/config';
import { ErrorFilter } from 'error.filter';
import { EmailScalar } from 'shared';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('typeorm'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('graphql'),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(configOptions),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('logger'),
      inject: [ConfigService],
    }),
    HttpModule,
    TerminusModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [HealthController],
  providers: [
    EmailScalar,
    ErrorFilter,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
