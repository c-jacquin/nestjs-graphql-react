import { UnauthorizedException } from '@nestjs/common';

import { Errors } from '@app/common';

export class ExpiredAccessTokenException extends UnauthorizedException {
  code = Errors.ACCESS_TOKEN_EXPIRED;
  message = 'Access token expired';
}
