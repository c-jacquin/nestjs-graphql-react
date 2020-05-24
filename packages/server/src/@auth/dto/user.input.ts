import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { PaginationArgs } from 'shared';
import { IsUUID, IsOptional, IsEmail, IsNumber } from 'class-validator';

@ArgsType()
export class UsersQueryInput extends PaginationArgs {
  @Field(() => ID)
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  role?: number;
}
