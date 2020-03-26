import { Field } from 'type-graphql';
import { InputType, ArgsType } from 'type-graphql';

import { Order } from './Order.model';

@InputType()
export class CreateOrderInput implements Partial<Order> {
  @Field()
  customer: string;

  @Field()
  book: string;

  @Field()
  quantity: string;
}

@InputType()
export class UpdateOrderInput implements Partial<Order> {
  @Field()
  customer: string;

  @Field()
  book: string;

  @Field()
  quantity: string;
}
