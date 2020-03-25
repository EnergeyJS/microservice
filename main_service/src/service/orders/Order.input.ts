import { Field } from 'type-graphql';
import { InputType, ArgsType } from 'type-graphql';

import { Order } from './Order.model';

@InputType()
export class CreateOrderInput implements Partial<Order> {
  @Field()
  name: string;
}

@InputType()
export class UpdateOrderInput implements Partial<Order> {
  @Field({ nullable : true })
  name: string;
}
