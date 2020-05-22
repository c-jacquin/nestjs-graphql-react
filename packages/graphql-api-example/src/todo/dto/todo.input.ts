import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  readonly label: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field(() => Int)
  readonly parent: number;
}
