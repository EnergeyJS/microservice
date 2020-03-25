import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

import getBaseModel from '../BaseModel';
import { getPaginateModel } from '../../lib/Paginate';
import { User } from '../users/User.model';

@ObjectType()
export class Book extends getBaseModel<Book>() {
  @Field()
  readonly _id: string;

  @Field()
  name: string;

  @Field(() => User)
  author: string;

  @Field()
  price: number;

}

export const BookPaginateModel = getPaginateModel(Book);