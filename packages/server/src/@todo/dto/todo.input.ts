import { InputType, Field, ID } from '@nestjs/graphql';
import { MaxLength, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @MaxLength(30)
  readonly label: string;

  @MaxLength(500)
  @IsOptional()
  readonly description?: string;

  @Field(() => ID)
  @IsUUID()
  @IsOptional()
  readonly parent: string;
}
