import { Field, InputType, ArgsType, ID } from '@nestjs/graphql';
import { MaxLength, MinLength, IsUUID, IsOptional } from 'class-validator';

import { PaginationArgs } from '../../@shared';

@ArgsType()
export class ListQueryInput extends PaginationArgs {
  @Field(() => ID)
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @MinLength(1)
  @IsOptional()
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
