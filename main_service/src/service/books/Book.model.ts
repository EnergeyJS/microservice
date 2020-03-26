import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import axios from 'axios';

import getBaseModel from '../BaseModel';
import { getPaginateModel } from '../../lib/Paginate';
import { User } from '../users/User.model';
import { DocumentType } from '@typegoose/typegoose';
const { BOOK_SERVICE_URL } = process.env;

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

export const getBook = async (
  ids: String[]
): Promise<DocumentType<Book>[]> => {
  const {data} = await axios.post(`${BOOK_SERVICE_URL}/api/book/populate`, {ids});

  const book = ids.map(key =>
    data.find(user => user._id.toString() === key.toString())
  );
  return book;
};