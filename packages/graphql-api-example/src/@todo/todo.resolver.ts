import {
  Inject,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { CurrentUser, ReqUser } from '@auth/decorators/current-user.decorator';
import { RestrictTo } from '@auth/decorators/role.decorator';
import { GqlAuthGuard } from '@auth/guards/graphql.guard';
import { ListEntity } from './entities/list.entity';
import { TodoEntity } from './entities/todo.entity';
import { CreateListInput, ListQueryInput } from './dto/list.input';
import { CreateTodoInput } from './dto/todo.input';
import { TodoService } from './todo.service';
import { Roles } from 'shared';

@UseGuards(GqlAuthGuard)
@Resolver(() => ListEntity)
export class TodoResolver {
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  @RestrictTo(Roles.ADMIN)
  @Query(() => [ListEntity])
  async list(@Args({ nullable: true }) query?: ListQueryInput) {
    return this.todoService.getLists(query);
  }

  @Query(() => ListEntity)
  async listById(@Args('id') id: string, @CurrentUser() user: ReqUser) {
    const list = await this.todoService.getListById(id);

    if (!list) {
      throw new NotFoundException();
    }

    if (list.userId !== user.id) {
      throw new ForbiddenException();
    }

    return list;
  }

  @Mutation(() => Boolean)
  async removeList(@Args('id') id: string, @CurrentUser() user: ReqUser) {
    await this.listById(id, user);
    const list = await this.todoService.removeList(id);

    return !list.id;
  }

  @Mutation(() => ListEntity)
  async createList(
    @Args('data') data: CreateListInput,
    @CurrentUser() user: ReqUser,
  ) {
    return this.todoService.createList({ ...data, userId: user.id });
  }

  @Mutation(() => TodoEntity)
  async createTodo(@Args('data') data: CreateTodoInput) {
    const parent = await this.todoService.getListById(data.parent);

    if (!parent) {
      throw new BadRequestException();
    }

    return this.todoService.createTodo(data);
  }
}
