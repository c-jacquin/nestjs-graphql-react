import { UnauthorizedException } from '@nestjs/common';

import { Errors } from 'shared'

export class ExpiredAccessTokenException extends UnauthorizedException {
  code = Errors.ACCESS_TOKEN_MISSING;
  message = 'Access token missing';
}
