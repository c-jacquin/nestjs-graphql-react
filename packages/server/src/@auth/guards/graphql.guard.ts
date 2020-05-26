import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ExpiredAccessTokenException } from '@auth/exceptions/expired-access-token.exception';
import { MissingRefreshTokenException } from '@auth/exceptions/missing-access-token.exception';
import { IContext } from 'shared';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<IContext>().req;

    return req;
  }

  handleRequest(err: never, user: never, info: Error) {
    if (info && info.name === 'TokenExpiredError')
      throw new ExpiredAccessTokenException();

    if (info && info.name === 'Error' && info.message === 'No auth token')
      throw new MissingRefreshTokenException();

    if (info) throw info;

    return user;
  }
}
