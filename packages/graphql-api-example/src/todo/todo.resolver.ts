import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { ListEntity } from './entities/list.entity';
import { TodoEntity } from './entities/todo.entity';
import { CreateListInput, ListQueryInput } from './inputs/list.input';
import { CreateTodoInput } from './inputs/todo.input';
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

	@Mutation(() => ListEntity)
	async createList(@Args('data') data: CreateListInput) {
		return this.todoService.createList(data)
  }
  
  @Mutation(() => TodoEntity)
  async createTodo(@Args('data') data: CreateTodoInput) {
    return this.todoService.createTodo(data);
  }
}
