import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListEntity } from './entities/list.entity';
import { TodoEntity } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ ListEntity, TodoEntity ]),
  ],
  controllers: [],
  providers: [
    TodoService,
    TodoResolver
  ],
})
export class TodoModule {}
