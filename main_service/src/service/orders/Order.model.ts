import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, modelOptions } from '@typegoose/typegoose';

import getBaseModel from '../BaseModel';
import { getPaginateModel } from '../../lib/Paginate';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Order extends getBaseModel<Order>() {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name: string;

}

export const OrderPaginateModel = getPaginateModel(Order);
export const OrderModel = getModelForClass(Order);
