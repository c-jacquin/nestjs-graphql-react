import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInDto {
  access_token: string;
}
