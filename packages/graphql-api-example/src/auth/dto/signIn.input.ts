import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class SignInInput {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
