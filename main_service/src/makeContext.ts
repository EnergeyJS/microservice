// import { IContext } from './makeContext';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { FastifyRequest } from 'fastify';
import fastify = require('fastify');
import DataLoader from 'dataloader';
import { getUser } from './service/users/User.model';

type App = fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

export interface IContext {
    app: App;
    user?: {
      _id?: string
    };
  }

type MakeContext = (app: App) => (request: FastifyRequest, connection: any) => IContext;

const makeContext: MakeContext = (app) => {
  return  (request, connection) => {
        const { user } = request as any;
        if (connection) {
          return connection.context;
        }
        return {
           app,
           user,
           loader: {
            user: new DataLoader(getUser),
           }
         };
      };
};

export default makeContext;
