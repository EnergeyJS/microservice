import _ from 'lodash';
import { Field, ObjectType } from 'type-graphql';
import { User } from '../users/User.model';
import { Book } from '../books/Book.model';

import getBaseModel from '../BaseModel';
import { getPaginateModel } from '../../lib/Paginate';

@ObjectType()
export class Order extends getBaseModel<Order>() {
  @Field()
  readonly _id: string;

  @Field(()=> User)
  customer: string;

  @Field(()=> Book)
  book: string;

  @Field()
  quantity: string;

}

export const OrderPaginateModel = getPaginateModel(Order);
