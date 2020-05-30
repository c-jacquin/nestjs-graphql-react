import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Roles } from '@app/common';
import { IContext } from 'common/_utils';
import { UsersService } from 'auth/users/users.service';
import { restrictToMetaKey } from 'auth/users/roles/roles.decorator';
import { RolesGuard } from 'common/roles/roles.guard';

@Injectable()
export class LocalRolesGuard implements RolesGuard {
  constructor(
    private readonly reflector: Reflector,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<IContext>().req;

    return req;
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const roles = this.reflector.get<Roles[]>(
      restrictToMetaKey,
      ctx.getHandler(),
    );
    if (!roles) {
      return true;
    }

    if (!req.user) {
      return false;
    }

    const user = await this.usersService.getOne({
      where: { id: req.user.id },
      relations: ['roleEntities'],
      select: ['id'],
    });

    return user.hasRole(roles);
  }
}
