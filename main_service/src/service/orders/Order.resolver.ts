
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { PaginateResult } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';

import { CreateOrderInput, UpdateOrderInput } from './Order.input';
import { Order, OrderModel, OrderPaginateModel } from './Order.model';
import { PaginationInput } from '../../lib/Paginate';

@Resolver()
export default class OrderResolver {

  // @Authorized()
  @Query(returns => OrderPaginateModel)
  async orders(
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<Order>>> {
    const orders = await OrderModel.paginate({ }, paginate);
    return orders;
  }

  @Mutation(returns => Order)
  async createOrder  (
    @Arg('data', { nullable: true }) data: CreateOrderInput
    ): Promise<DocumentType<Order>> {
    const order = new OrderModel(data as Order);
    const saved = await order.save();
    return saved;
  }

  @Mutation(returns => Order)
  async updateOrder(
    @Arg('_id', { nullable: true }) _id ?: ObjectId,
    @Arg('data', { nullable: true }) data ?: UpdateOrderInput
  ): Promise<DocumentType<Order>> {
    const order = await OrderModel.findOne({_id});
    _.forEach(data, (item , key ) => {
      order[key] = item;
    });
    const saved = await order.save();
    return saved;
  }

  @Mutation(returns => String)
  async deleteOrder(
    @Arg('_id', { nullable: true }) _id ?: ObjectId
  ): Promise<string> {
    const order = await OrderModel.findOne({_id});
    const saved = await order.remove();
    return 'Success';
  }
}
