import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { PaginationArgs } from 'common/_utils';

@ArgsType()
export class UsersArgs extends PaginationArgs {
  @IsUUID()
  @IsOptional()
  @Field(() => ID, { nullable: true })
  readonly id?: string;

  @IsEmail()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly email?: string;

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  role?: number;
}
