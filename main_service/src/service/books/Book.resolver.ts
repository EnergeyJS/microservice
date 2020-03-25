
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { PaginateResult } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { Resolver, Query, Mutation, Arg, Authorized, FieldResolver, Root, Ctx } from 'type-graphql';
import axios from 'axios';

import { CreateBookInput, UpdateBookInput } from './Book.input';
import { Book, BookPaginateModel } from './Book.model';
import { PaginationInput } from '../../lib/Paginate';
import { User } from '../users/User.model';

const { BOOK_SERVICE_URL } = process.env;


@Resolver(()=> Book)
export default class BookResolver {

  // @Authorized()
  @Query(returns => BookPaginateModel)
  async books(
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<Book>>> {
    const {data} = await axios.get(`${BOOK_SERVICE_URL}/api/book?page=${paginate.page}&limit=${paginate.limit}`);
    return data;
  }

  @Mutation(returns => Book)
  async createBook  (
    @Arg('input', { nullable: true }) input: CreateBookInput
    ): Promise<DocumentType<Book>> {
      const {data} = await axios.post(`${BOOK_SERVICE_URL}/api/book`, input);
    return data;
  }

  @Mutation(returns => Book)
  async updateBook(
    @Arg('_id', { nullable: true }) _id ?: string,
    @Arg('input', { nullable: true }) input ?: UpdateBookInput
  ): Promise<DocumentType<Book>> {
    const {data} = await axios.put(`${BOOK_SERVICE_URL}/api/book/${_id}`, input);
    return data;
  }

  @Mutation(returns => String)
  async deleteBook(
    @Arg('_id', { nullable: true }) _id ?: string
  ): Promise<string> {
    const {data} = await axios.get(`${BOOK_SERVICE_URL}/api/book`);
    return data;
  }

  @FieldResolver(() => Book)
  async author(@Root() book: Book, @Ctx() ctx): Promise<User> {
    const { author } = book;
    return ctx.loader.user.load(author);
  }
}
