import { InputType, Field, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @MaxLength(30)
  readonly label: string;

  @MaxLength(500)
  readonly description?: string;

  @Field(() => Int)
  readonly parent: number;
}
