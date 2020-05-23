import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles, IContext } from 'shared';
import { UsersService } from '@auth/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
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

    const roles = this.reflector.get<Roles[]>('roles', ctx.getHandler());
    if (!roles) {
      return true;
    }

    if (!req.user) {
      return false;
    }

    const user = await this.usersService.getOne({
      where: { id: req.user.id },
      relations: ['role'],
      select: ['role', 'id'],
    });

    return user.hasRole(roles);
  }
}
