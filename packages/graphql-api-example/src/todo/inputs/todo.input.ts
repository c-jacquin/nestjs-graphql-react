import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  readonly label: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field()
  readonly parent: number;
}
