
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { PaginateResult } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { Resolver, Query, Mutation, Arg, Authorized, Ctx, } from 'type-graphql';

import { CreateUserInput, UpdateUserInput } from './User.input';
import { User, UserModel, UserPaginateModel } from './User.model';
import { PaginationInput } from '../../lib/Paginate';
import axios from 'axios';
const { CUSTOMER_SERVICE_URL } = process.env;

@Resolver()
export default class UserResolver {

  // @Authorized()
  @Query(returns => UserPaginateModel)
  async users(
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<User>>> {
    const {data} = await axios.get(`${CUSTOMER_SERVICE_URL}/api/user`);
    return data;
  }

  @Mutation(returns => User)
  async createUser  (
    @Arg('data', { nullable: true }) data: CreateUserInput,
    ): Promise<DocumentType<User>> {
    const response = await axios.post(`${CUSTOMER_SERVICE_URL}/api/user`, data);
    return response.data;
  }

  @Authorized()
  @Mutation(returns => User)
  async updateUser(
    @Arg('_id', { nullable: true }) _id ?: ObjectId,
    @Arg('data', { nullable: true }) data ?: UpdateUserInput
  ): Promise<DocumentType<User>> {
    const response = await axios.put(`${CUSTOMER_SERVICE_URL}/api/user/${_id}`, data);
    return response.data;
  }

  @Mutation(returns => String)
  async deleteUser(
    @Arg('_id', { nullable: true }) _id ?: ObjectId
  ): Promise<string> {
    const user = await UserModel.findOne({_id});
    const saved = await user.remove();
    return 'Success';
  }
}
