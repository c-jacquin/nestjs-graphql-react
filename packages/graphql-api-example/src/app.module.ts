import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { EmailScalar } from './core';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      debug: process.env.NODE_ENV === 'debug'
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: process.env.NODE_ENV === 'debug'
    }),
    TodoModule
  ],
  controllers: [],
  providers: [
    // EmailScalar,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
