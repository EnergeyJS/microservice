---
to: src/service/<%=h.changeCase.camel(h.inflection.pluralize(modelName))%>/<%=h.changeCase.pascal(h.inflection.singularize(modelName))%>.model.ts
---
<%
  models = h.changeCase.camel(h.inflection.pluralize(modelName))
  model = h.changeCase.camel(h.inflection.singularize(modelName))
  Model = h.changeCase.pascal(h.inflection.singularize(modelName))
%>import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { prop as Property, getModelForClass, modelOptions } from '@typegoose/typegoose';

import getBaseModel from '../BaseModel';
import { getPaginateModel } from '../../lib/Paginate';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class <%= Model %> extends getBaseModel<<%= Model %>>() {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name: string;

}

export const <%= Model %>PaginateModel = getPaginateModel(<%= Model %>);
export const <%= Model %>Model = getModelForClass(<%= Model %>);
