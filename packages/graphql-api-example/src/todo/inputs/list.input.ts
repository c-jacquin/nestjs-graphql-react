import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class ListQueryInput {
  @Field(() => Int, { nullable: true })
  readonly id?: number;

  @Field({ nullable: true })
  readonly label?: string;
}

@InputType()
export class CreateListInput {
  @Field()
  readonly label: string;
  
  @Field({ nullable: true })
  readonly description?: string;
}
