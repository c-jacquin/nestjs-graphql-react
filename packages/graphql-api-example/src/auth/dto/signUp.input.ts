import { Field, ArgsType } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  // Matches,
  IsEmail,
} from 'class-validator';
import { EmailScalar as Email } from '@shared';

@ArgsType()
export class SignUpInput {
  @IsEmail()
  @Field(() => Email)
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  readonly password: string;
}
