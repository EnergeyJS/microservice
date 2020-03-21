---
inject: true
to: src/makeSchema.ts
after: resolvers
skip_if: h.changeCase.pascal(h.inflection.singularize(modelName))Resolver
---
<% Model = h.changeCase.pascal(h.inflection.singularize(modelName)) %>      <%= Model %>Resolver,