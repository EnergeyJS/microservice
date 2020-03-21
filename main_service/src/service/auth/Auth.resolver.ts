
import _ from 'lodash';
import { IContext } from './../../makeContext';
import { DocumentType } from '@typegoose/typegoose';
import { Resolver, Mutation, Args, Ctx} from 'type-graphql';
import { loginInput } from './Auth.input';
import { Auth } from './Auth.model';
import axios from 'axios';
const { BASE_URL } = process.env;
import { AuthenticationError } from 'apollo-server-core';

@Resolver()
export default class UserAuthResolver {

  @Mutation(returns => Auth)
  async login  (
    @Args() { password , email  }: loginInput,
    @Ctx() { app }: IContext
    ) {
      try {
        const {data} = await axios.post(`${BASE_URL}/api/auth/login`, {email, password});
              data.token = await app.jwt.sign(data.user)
        return data;
      } catch (error) {
        throw new AuthenticationError('Email or password doesn\'t match');
      }
  }
}
