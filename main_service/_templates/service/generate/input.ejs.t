---
to: src/service/<%=h.changeCase.camel(h.inflection.pluralize(modelName))%>/<%=h.changeCase.pascal(h.inflection.singularize(modelName))%>.input.ts
---
<%
  models = h.changeCase.camel(h.inflection.pluralize(modelName))
  model = h.changeCase.camel(h.inflection.singularize(modelName))
  Model = h.changeCase.pascal(h.inflection.singularize(modelName))
%>import { Field } from 'type-graphql';
import { InputType, ArgsType } from 'type-graphql';

import { <%= Model %> } from './<%= Model %>.model';

@InputType()
export class Create<%= Model %>Input implements Partial<<%= Model %>> {
  @Field()
  name: string;
}

@InputType()
export class Update<%= Model %>Input implements Partial<<%= Model %>> {
  @Field({ nullable : true })
  name: string;
}
