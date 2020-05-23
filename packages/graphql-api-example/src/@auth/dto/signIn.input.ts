import { ArgsType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class SignInInput {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
