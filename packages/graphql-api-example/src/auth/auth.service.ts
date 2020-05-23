import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Env } from '@shared';
import { SignInDto } from './dto/signIn.model';
import { SignUpInput } from './dto/signUp.input';
import { ResetPassInput } from './dto/reset-pass.input';
import { UserEntity } from './entities/user.entity';

type SimpleUser = Pick<UserEntity, 'email' | 'id' | 'count'>

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private config: ConfigService
  ) {}

  generateToken(user: SimpleUser): SignInDto {
    return {
      accessToken: this.jwtService.sign({
        email: user.email,
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
    }
  }

  async validateLocalUser(
    email: string,
    pass: string,
  ): Promise<SimpleUser> {
    const user = await this.userRepository.findOne({ where: { email }, select: ['email', 'id', 'count'] });
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

    await this.userRepository.save(validUser);

    return this.generateToken(validUser);
  }

  async signup(data: SignUpInput) {
    const user = new UserEntity();
    user.email = data.email;
    user.password = data.password;

    return this.userRepository.save(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const { sub, count } = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({ where: { sub } });

      if (count !== user.count) {
        throw new Error();
      }

      return this.generateToken(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  // Todo: Too simple add email thingz ...
  async resetUserPassword({ id, password }: ResetPassInput) {
    const user = await this.getUserById(id);

    user.newPassword = password;
    user.count++;

    await this.userRepository.save(user);

    return true;
  }
}
