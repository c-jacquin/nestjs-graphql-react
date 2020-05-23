import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

import { RestrictTo } from '@auth/decorators/role.decorator';
import { UserEntity } from '@auth/entities/user.entity';
import { UsersQueryInput } from '@auth/dto/user.input';
import { GqlAuthGuard } from '@auth/guards/graphql.guard';
import { RolesGuard } from '@auth/guards/role.guard';
import { UsersService } from './users.service';
import { Roles } from 'shared';

@UseGuards(GqlAuthGuard)
@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @RestrictTo(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @Query(() => [UserEntity])
  getUsers(@Args() query?: UsersQueryInput) {
    return this.usersService.get(query);
  }
}
