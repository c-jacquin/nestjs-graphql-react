import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { GqlAuthGuard } from '@auth/guards/graphql.guard';
import { ListEntity } from './entities/list.entity';
import { TodoEntity } from './entities/todo.entity';
import { CreateListInput, ListQueryInput } from './dto/list.input';
import { CreateTodoInput } from './dto/todo.input';
import { TodoService } from './todo.service';

@Resolver(() => ListEntity)
export class TodoResolver {
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [ListEntity])
  async list(
    @Args({ nullable: true }) query?: ListQueryInput,
  ) {
    return this.todoService.getLists(query);
  }

  @Query(() => ListEntity)
  async listById(@Args('id') id: string) {
    const list = await this.todoService.getListById(id);

    if (!list) {
      throw new NotFoundException();
    }

    return list;
  }

  @Mutation(() => Boolean)
  async removeList(@Args('id') id: string) {
    try {
      const list = await this.todoService.removeList(id);

      return !list.id;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => ListEntity)
  async createList(@Args('data') data: CreateListInput) {
    return this.todoService.createList(data);
  }

  @Mutation(() => TodoEntity)
  async createTodo(@Args('data') data: CreateTodoInput) {
    return this.todoService.createTodo(data);
  }
}
