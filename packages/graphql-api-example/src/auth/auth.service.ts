import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { SignUpInput } from './dto/signUp.input';
import { SignInDto } from './dto/signIn.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  async validateLocalUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password' | 'hashPassword' | 'authenticate'>> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await user.authenticate(pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: Partial<UserEntity>): Promise<SignInDto> {
    const validUser = await this.validateLocalUser(user.email, user.password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    const payload = { email: validUser.email, sub: validUser.id };

    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(data: SignUpInput) {
    const user = new UserEntity();
    user.email = data.email;
    user.password = data.password;

    return this.userRepository.save(user);
  }
}
