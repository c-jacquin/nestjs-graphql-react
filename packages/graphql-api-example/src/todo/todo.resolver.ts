import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { ListEntity } from './entities/list.entity';
import { TodoEntity } from './entities/todo.entity';
import { CreateListInput, ListQueryInput } from './dto/list.input';
import { CreateTodoInput } from './dto/todo.input';
import { TodoService } from './todo.service';

@Resolver(() => ListEntity)
export class TodoResolver {
  constructor(
    @Inject(TodoService) private todoService: TodoService
  ) {}

  @Query(() => [ListEntity])
  async list(@Args({ nullable: true }) query?: ListQueryInput) {
    return this.todoService.getList(query);
  }

  @Query(() => ListEntity)
  async listById(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.getListById(id);
  }

  @Mutation(() => Boolean)
  async removeList(@Args('id', { type: () => Int }) id: number) {
    try {
      const list = await this.todoService.removeList(id);

      return !list.id;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

	@Mutation(() => ListEntity)
	async createList(@Args('data') data: CreateListInput) {
		return this.todoService.createList(data)
  }
  
  @Mutation(() => TodoEntity)
  async createTodo(@Args('data') data: CreateTodoInput) {
    return this.todoService.createTodo(data);
  }
}
