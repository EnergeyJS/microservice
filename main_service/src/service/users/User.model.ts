import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, modelOptions } from '@typegoose/typegoose';

import getBaseModel from '../BaseModel';
import { getPaginateModel } from '../../lib/Paginate';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends getBaseModel<User>() {
  @Field({nullable: true})
  readonly _id: string;

  @Field()
  email: string;

  @Field()
  name: string;

}

export const UserPaginateModel = getPaginateModel(User);
export const UserModel = getModelForClass(User);
