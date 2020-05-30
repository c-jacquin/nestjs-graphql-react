import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export type ReqUser = { id: string };

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ReqUser => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
