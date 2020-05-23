import { Field, Int, registerEnumType, ArgsType } from '@nestjs/graphql';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(Order, {
  name: 'Order',
});

@ArgsType()
export abstract class PaginationArgs {
  @Field(() => Int)
  readonly skip?: number;

  @Field(() => Int)
  readonly take?: number;

  @Field(() => Order)
  readonly order?: Order = Order.DESC;

  readonly sortBy?: string = 'createdAt';
}
