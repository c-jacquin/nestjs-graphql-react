import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ExpiredAccessTokenException } from '@auth/exceptions/expired-access-token.exception';
import { IContext } from 'shared';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<IContext>().req;

    return req;
  }

  handleRequest(err: any, user: any, info: any) {
    if (info && info.name === 'TokenExpiredError')
      throw new ExpiredAccessTokenException();

    if (info && info.name === 'Error' && info.message === 'No auth token')
      throw new UnauthorizedException(info);

    if (info) throw info;

    return user;
  }
}
