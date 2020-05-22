import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailScalar } from './core';
import { TodoModule } from './todo/todo.module';
import { configValidator } from 'core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      debug: !!process.env.DEBUG,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: !!process.env.DEBUG,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: configValidator,
    }),
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [
    EmailScalar,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
