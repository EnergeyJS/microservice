import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, modelOptions, DocumentType } from '@typegoose/typegoose';

import getBaseModel from '../BaseModel';
import { getPaginateModel } from '../../lib/Paginate';
import axios from 'axios';
const { CUSTOMER_SERVICE_URL } = process.env;

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

export const getUser = async (
  ids: String[]
): Promise<DocumentType<User>[]> => {
  const {data} = await axios.post(`${CUSTOMER_SERVICE_URL}/api/user/populate`, {ids});

  const user = ids.map(key =>
    data.find(user => user._id.toString() === key.toString())
  );
  return user;
};
