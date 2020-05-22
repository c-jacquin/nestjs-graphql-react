import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'auth/entities/user.entity';

export const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]): UserEntity => ctx.req && ctx.req.user,
);
