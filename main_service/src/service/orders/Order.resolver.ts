
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { PaginateResult } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { Resolver, Query, Mutation, Arg, Authorized, FieldResolver, Root, Ctx } from 'type-graphql';
import axios from 'axios';

import { CreateOrderInput, UpdateOrderInput } from './Order.input';
import { Order, OrderPaginateModel } from './Order.model';
import { PaginationInput } from '../../lib/Paginate';
const { ORDER_SERVICE_URL, BOOK_SERVICE_URL } = process.env;
@Resolver(()=> Order)
export default class OrderResolver {

  // @Authorized()
  @Query(returns => OrderPaginateModel)
  async orders(
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<Order>>> {
    const {data} = await axios.get(`${ORDER_SERVICE_URL}/api/order?page=${paginate.page}&limit=${paginate.limit}`);
    return data;
  }

  @Mutation(returns => Order)
  async createOrder  (
    @Arg('input', { nullable: true }) input: CreateOrderInput
    ): Promise<DocumentType<Order>> {
      const {data} = await axios.post(`${ORDER_SERVICE_URL}/api/order`, input);
      return data;
  }

  @Mutation(returns => Order)
  async updateOrder(
    @Arg('_id', { nullable: true }) _id ?: ObjectId,
    @Arg('input', { nullable: true }) input ?: UpdateOrderInput
  ): Promise<DocumentType<Order>> {
    const {data} = await axios.put(`${ORDER_SERVICE_URL}/api/order/${_id}`, input);
    return data;
  }

  @Mutation(returns => Order)
  async deleteOrder(
    @Arg('_id', { nullable: true }) _id ?: ObjectId
  ): Promise<DocumentType<Order>> {
    const {data} = await axios.delete(`${ORDER_SERVICE_URL}/api/order/${_id}`);
    return data;
  }

  @FieldResolver(() => Order)
  async book(@Root() order: Order, @Ctx() ctx): Promise<Order> {
    const { book } = order;
    return ctx.loader.book.load(book);
  }

  @FieldResolver(() => Order)
  async customer(@Root() order: Order, @Ctx() ctx): Promise<Order> {
    const { customer } = order;
    return ctx.loader.user.load(customer);
  }

  @Query(returns => OrderPaginateModel)
  async ordersByCutomer(
    @Arg('customerId', { nullable: true }) customerId ?: ObjectId,
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<Order>>> {
    const {data} = await axios.get(`${ORDER_SERVICE_URL}/api/order/customer/${customerId}?page=${paginate.page}&limit=${paginate.limit}`);
    return data;
  }

  @Query(returns => OrderPaginateModel)
  async ordersByBook(
    @Arg('bookId', { nullable: true }) bookId ?: ObjectId,
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<Order>>> {
    const {data} = await axios.post(`${ORDER_SERVICE_URL}/api/order/book/${bookId}?page=${paginate.page}&limit=${paginate.limit}`);
    return data;
  }

  @Query(returns => OrderPaginateModel)
  async ordersByAuthor(
    @Arg('authorId', { nullable: true }) authorId ?: ObjectId,
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<Order>>> {
    const {data : { docs }} = await axios.get(`${BOOK_SERVICE_URL}/api/book/books-by-author/${authorId}?page=${paginate.page}&limit=${paginate.limit}`);
    const bookIds = [];
    docs.forEach(book => {
      bookIds.push(book._id);
    });
    const {data} = await axios.post(`${ORDER_SERVICE_URL}/api/order/author/${authorId}?page=${paginate.page}&limit=${paginate.limit}`, {bookIds});
    return data;
  }
}
