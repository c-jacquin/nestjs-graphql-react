import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { AuthModule } from '@auth/auth.module';
import { TodoModule } from '@todo/todo.module';
import configOptions from 'config/config';
import { AllExceptionsFilter } from 'error.filter';
import { EmailScalar } from 'shared';

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
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [
    EmailScalar,
    AllExceptionsFilter,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
