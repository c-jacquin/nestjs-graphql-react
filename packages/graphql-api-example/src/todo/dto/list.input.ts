import { Field, Int, InputType, ArgsType } from '@nestjs/graphql';

import { PaginationArgs } from '../../core';

@ArgsType()
export class ListQueryInput extends PaginationArgs {
  @Field(() => Int)
  readonly id?: number;
  readonly label?: string;
}

@InputType()
export class CreateListInput {
  readonly label: string;  
  readonly description?: string;
}
