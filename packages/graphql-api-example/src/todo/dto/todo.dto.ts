
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TodoDto {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly label: string;
  
  @Field({ nullable: true })
  readonly description?: string;
}
