
import {
  Catch,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  catch(exception: Error) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;


    switch (status) {
      case HttpStatus.INTERNAL_SERVER_ERROR:
        this.logger.error(`${status.toString()} ${exception.message}`);
        break;
      default:
        this.logger.warn(`Error ==> ${status.toString()} ${exception.message}`);
    }

    return exception;
  }
}