import { createParamDecorator } from '@nestjs/common';
import { Response } from 'express';

export const HttpRequest = createParamDecorator(
  (data, [root, args, ctx, info]): Request => ctx.req,
);
