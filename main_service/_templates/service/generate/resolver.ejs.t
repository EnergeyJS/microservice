---
to: src/service/<%=h.changeCase.camel(h.inflection.pluralize(modelName))%>/<%=h.changeCase.pascal(h.inflection.singularize(modelName))%>.resolver.ts
---
<%
  models = h.changeCase.camel(h.inflection.pluralize(modelName))
  model = h.changeCase.camel(h.inflection.singularize(modelName))
  Model = h.changeCase.pascal(h.inflection.singularize(modelName))
%>
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { PaginateResult } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';

import { Create<%= Model %>Input, Update<%= Model %>Input } from './<%= Model %>.input';
import { <%= Model %>, <%= Model %>Model, <%= Model %>PaginateModel } from './<%= Model %>.model';
import { PaginationInput } from '../../lib/Paginate';

@Resolver()
export default class <%= Model %>Resolver {

  // @Authorized()
  @Query(returns => <%= Model %>PaginateModel)
  async <%= models %>(
    @Arg('pagination', { nullable: true }) paginate: PaginationInput= { page: 1, limit: 50 }
  ): Promise<PaginateResult<DocumentType<<%= Model %>>>> {
    const <%= models %> = await <%= Model %>Model.paginate({ }, paginate);
    return <%= models %>;
  }

  @Mutation(returns => <%= Model %>)
  async create<%= Model %>  (
    @Arg('data', { nullable: true }) data: Create<%= Model %>Input
    ): Promise<DocumentType<<%= Model %>>> {
    const <%= model %> = new <%= Model %>Model(data as <%= Model %>);
    const saved = await <%= model %>.save();
    return saved;
  }

  @Mutation(returns => <%= Model %>)
  async update<%= Model %>(
    @Arg('_id', { nullable: true }) _id ?: ObjectId,
    @Arg('data', { nullable: true }) data ?: Update<%= Model %>Input
  ): Promise<DocumentType<<%= Model %>>> {
    const <%= model %> = await <%= Model %>Model.findOne({_id});
    _.forEach(data, (item , key ) => {
      <%= model %>[key] = item;
    });
    const saved = await <%= model %>.save();
    return saved;
  }

  @Mutation(returns => String)
  async delete<%= Model %>(
    @Arg('_id', { nullable: true }) _id ?: ObjectId
  ): Promise<string> {
    const <%= model %> = await <%= Model %>Model.findOne({_id});
    const saved = await <%= model %>.remove();
    return 'Success';
  }
}
