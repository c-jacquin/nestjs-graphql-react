import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from '@auth/entities/user.entity';

export type ReqUser = Pick<UserEntity, 'id'>;

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ReqUser => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
