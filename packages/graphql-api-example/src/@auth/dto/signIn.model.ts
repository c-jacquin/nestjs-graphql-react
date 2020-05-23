import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInDto {
  accessToken: string;
  refreshToken: string;
}
