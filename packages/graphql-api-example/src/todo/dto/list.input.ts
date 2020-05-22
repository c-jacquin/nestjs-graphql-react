import { Field, Int, InputType, ArgsType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

import { PaginationArgs } from '../../core';

@ArgsType()
export class ListQueryInput extends PaginationArgs {
  @Field(() => Int)
  readonly id?: string;

  readonly label?: string;
}

@InputType()
export class CreateListInput {
  @MaxLength(30)
  readonly label: string;

  @MaxLength(500)
  @IsOptional()
  readonly description?: string;
}
