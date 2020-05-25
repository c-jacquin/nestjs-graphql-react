import { Catch, ArgumentsHost, Inject, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { Errors, HttpHeaders } from '@app/common';
import { AuthService } from '@auth/auth.service';
import { ExpiredAccessTokenException } from './exceptions/expired-access-token.exception';
import { IContext, Env } from 'shared';
import { UsersService } from '@auth/users/users.service';

@Catch(ExpiredAccessTokenException)
export class AuthFilter implements GqlExceptionFilter {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(HttpService) private readonly http: HttpService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  async catch(exception: ExpiredAccessTokenException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const { req, res } = gqlHost.getContext<IContext>();
    const { fieldName } = gqlHost.getInfo();

    try {
      const { sub, count } = await this.jwtService.verifyAsync(
        req.headers[HttpHeaders.X_REFRESH_TOKEN] as string,
      );
      const user = await this.usersService.getOne({ where: { id: sub } });

      // Check if the user has reset his pawword recently
      if (count !== user.count) {
        throw new Error();
      }

      const { accessToken, refreshToken } = this.authService.generateToken(
        user,
      );

      res.set({
        [HttpHeaders.X_ACCESS_TOKEN]: accessToken,
        [HttpHeaders.X_REFRESH_TOKEN]: refreshToken,
      });

      // Redo the http call with the valid access token
      const host = this.config.get(Env.HOST);
      const port = this.config.get(Env.PORT);
      const url = `http://${host}:${port}${req.originalUrl}`;
      const headers = {
        [HttpHeaders.AUTHORIZATION]: `Bearer ${accessToken}`,
      };

      const {
        data: { data },
      } = await this.http.post(url, req.body, { headers }).toPromise();

      return data[fieldName];
    } catch (err) {
      exception.code = Errors.REFRESH_TOKEN;
      exception.message = 'Unauthorized';

      res.status(exception.getStatus());

      return exception;
    }
  }
}
