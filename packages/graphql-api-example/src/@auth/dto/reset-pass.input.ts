import { ArgsType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@ArgsType()
export class ResetPassInput {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly password: string;
}
