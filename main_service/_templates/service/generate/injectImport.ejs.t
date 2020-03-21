---
inject: true
to: src/makeSchema.ts
after: service_resolver_imports
skip_if: h.changeCase.pascal(h.inflection.singularize(modelName))Resolver
---
<%
  Model = h.changeCase.pascal(h.inflection.singularize(modelName))
  Folder = h.changeCase.camel(h.inflection.pluralize(modelName))
%>import <%= Model %>Resolver from './service/<%= Folder %>/<%= Model %>.resolver';