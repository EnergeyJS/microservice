
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { PaginateResult } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import axios from 'axios';

import { CreateBookInput, UpdateBookInput } from './Book.input';
import { Book, BookPaginateModel } from './Book.model';
import { PaginationInput } from '../../lib/Paginate';

const { BOOK_SERVICE_URL } = process.env;


@Resolver()
export default class BookResolver {

  // @Authorized()
  @Query(returns => BookPaginateModel)
  async books(
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<Book>>> {
    const {data} = await axios.get(`${BOOK_SERVICE_URL}/api/book`);
    return data;
  }

  @Mutation(returns => Book)
  async createBook  (
    @Arg('input', { nullable: true }) input: CreateBookInput
    ): Promise<DocumentType<Book>> {
      const {data} = await axios.post(`${BOOK_SERVICE_URL}/api/book`, {input});
    return data;
  }

  @Mutation(returns => Book)
  async updateBook(
    @Arg('_id', { nullable: true }) _id ?: ObjectId,
    @Arg('input', { nullable: true }) input ?: UpdateBookInput
  ): Promise<DocumentType<Book>> {
    const {data} = await axios.get(`${BOOK_SERVICE_URL}/api/book`);
    return data;
  }

  @Mutation(returns => String)
  async deleteBook(
    @Arg('_id', { nullable: true }) _id ?: ObjectId
  ): Promise<string> {
    const {data} = await axios.get(`${BOOK_SERVICE_URL}/api/book`);
    return data;
  }
}
