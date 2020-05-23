import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Env } from 'shared';
import { ResetPassInput } from './dto/reset-pass.input';
import { SignInDto } from './dto/signIn.model';
import { SignUpInput } from './dto/signUp.input';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users/users.service';

type SimpleUser = Pick<UserEntity, 'email' | 'id' | 'count'>;

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  generateToken(user: SimpleUser): SignInDto {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
      }),
      refreshToken: this.jwtService.sign(
        {
          count: user.count,
          sub: user.id,
        },
        {
          expiresIn: this.config.get(Env.REFRESH_TOKEN_DURATION),
        },
      ),
    };
  }

  async validateLocalUser(email: string, pass: string): Promise<SimpleUser> {
    const user = await this.usersService.getOne({
      where: { email },
      select: ['id', 'count', 'password'],
      relations: ['role'],
    });

    if (user && (await user.authenticate(pass))) {
      return user;
    }

    return null;
  }

  async login(user: Partial<UserEntity>): Promise<SignInDto> {
    const validUser = await this.validateLocalUser(user.email, user.password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    return this.generateToken(validUser);
  }

  async signup(data: SignUpInput) {
    return this.usersService.create(data);
  }

  async refreshToken(refreshToken: string) {
    try {
      const { sub, count } = this.jwtService.verify(refreshToken);
      const user = await this.usersService.getOne({ where: { sub } });

      if (count !== user.count) {
        throw new Error();
      }

      return this.generateToken(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  // Todo: Too simple add email thingz ...
  async resetUserPassword({ id, password }: ResetPassInput) {
    const user = await this.usersService.getOne({ where: { id } });

    await this.usersService.update(id, {
      newPassword: password,
      count: user.count++,
    });

    return true;
  }

  async whoAmI(id: string) {
    return this.usersService.getOne({ where: { id } });
  }
}
