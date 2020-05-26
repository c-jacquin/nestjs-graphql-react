import { UnauthorizedException } from '@nestjs/common';

import { Errors } from '@app/common';

export class MissingRefreshTokenException extends UnauthorizedException {
  message = Errors.ACCESS_TOKEN_MISSING;
}
