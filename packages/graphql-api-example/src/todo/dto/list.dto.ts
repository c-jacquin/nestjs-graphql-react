
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TodoDto } from './todo.dto';

@ObjectType()
export class ListDto {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly label: string;
  
  @Field({ nullable: true })
  readonly description?: string;

  @Field(() => [TodoDto], { nullable: 'itemsAndList' })
  readonly todos: TodoDto[];
}
