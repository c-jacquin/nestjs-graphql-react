import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { SignInInput } from './dto/signIn.input';
import { SignUpInput } from './dto/signUp.input';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.model';
import { UserEntity } from './entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}
  
  @Mutation(() => SignInDto)
  login(
    @Args('loginInput') input: SignInInput,
  ) {
    return this.authService.login(input);
  }

  @Mutation(() => UserEntity)
  signup(@Args('signUpInput') input: SignUpInput) {
    return this.authService.signup(input);
  }
}
