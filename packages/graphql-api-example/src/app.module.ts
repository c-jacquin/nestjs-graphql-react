import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailScalar, IContext, NodeEnv } from '@shared';
import { configSchema } from 'config';
import { TodoModule } from 'todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      debug: !!process.env.DEBUG,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: !!process.env.DEBUG,
      context: ({ req }): IContext => ({ req, res: req.res }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === NodeEnv.PROD,
      validationSchema: configSchema,
    }),
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
