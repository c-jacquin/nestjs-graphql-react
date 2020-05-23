import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ResetPassInput } from './dto/reset-pass.input';
import { SignInInput } from './dto/signIn.input';
import { SignInDto } from './dto/signIn.model';
import { SignUpInput } from './dto/signUp.input';
import { UserEntity } from './entities/user.entity';
import { GqlAuthGuard } from './guards/graphql.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  whoAmI(@CurrentUser() user: UserEntity) {
    return this.authService.getUserById(user.id);
  }
  
  @Mutation(() => SignInDto)
  login(
    @Args() input: SignInInput,
  ) {
    return this.authService.login(input);
  }

  @Mutation(() => UserEntity)
  signup(@Args() input: SignUpInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => Boolean)
  resetPassword(@Args() input: ResetPassInput) {
    return this.authService.resetUserPassword(input);
  }
}
