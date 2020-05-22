import { createParamDecorator } from '@nestjs/common';
import { Response } from 'express';

export const ResGql = createParamDecorator(
  (data, [root, args, ctx, info]): Response => ctx.res,
);
