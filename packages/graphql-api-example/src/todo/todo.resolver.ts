import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { ListDto } from './dto/list.dto';
import { TodoDto } from './dto/todo.dto';
import { CreateListInput, ListQueryInput } from './inputs/list.input';
import { CreateTodoInput } from './inputs/todo.input';
import { TodoService } from './todo.service';

@Resolver(() => ListDto)
export class TodoResolver {
  constructor(
    @Inject(TodoService) private todoService: TodoService
  ) {}

  @Query(() => [ListDto])
  async list(@Args('query', { nullable: true }) data?: ListQueryInput) {
    return this.todoService.getList(data);
  }

  @Query(() => ListDto)
  async listById(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.getListById(id);
  }

	@Mutation(() => ListDto)
	async createList(@Args('data') data: CreateListInput) {
		return this.todoService.createList(data)
  }
  
  @Mutation(() => TodoDto)
  async createTodo(@Args('data') data: CreateTodoInput) {
    return this.todoService.createTodo(data);
  }
}
