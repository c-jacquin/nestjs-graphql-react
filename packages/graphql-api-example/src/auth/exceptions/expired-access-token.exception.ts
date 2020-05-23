import { Errors } from '@shared/enums'

export class ExpiredAccessTokenException extends Error {
  code = Errors.ACCESS_TOKEN;
  message = 'Access token expired';
  status = 401;
}
