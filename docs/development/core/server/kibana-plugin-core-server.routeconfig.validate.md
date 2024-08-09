<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [RouteConfig](./kibana-plugin-core-server.routeconfig.md) &gt; [validate](./kibana-plugin-core-server.routeconfig.validate.md)

## RouteConfig.validate property

A schema created with `@kbn/config-schema` that every request will be validated against.

**Signature:**

```typescript
validate: RouteValidatorFullConfig<P, Q, B> | false;
```

## Remarks

You \*must\* specify a validation schema to be able to read: - url path segments - request query - request body To opt out of validating the request, specify `validate: false`<!-- -->. In this case request params, query, and body will be \*\*empty\*\* objects and have no access to raw values. In some cases you may want to use another validation library. To do this, you need to instruct the `@kbn/config-schema` library to output \*\*non-validated values\*\* with setting schema as `schema.object({}, { unknowns: 'allow' })`<!-- -->;

## Example


```ts
 import { schema } from '@kbn/config-schema';
 router.get({
  path: 'path/{id}',
  validate: {
    params: schema.object({
      id: schema.string(),
    }),
    query: schema.object({...}),
    body: schema.object({...}),
  },
},
(context, req, res,) {
  req.params; // type Readonly<{id: string}>
  console.log(req.params.id); // value
});

router.get({
  path: 'path/{id}',
  validate: false, // handler has no access to params, query, body values.
},
(context, req, res,) {
  req.params; // type Readonly<{}>;
  console.log(req.params.id); // undefined
});

router.get({
  path: 'path/{id}',
  validate: {
    // handler has access to raw non-validated params in runtime
    params: schema.object({}, { unknowns: 'allow' })
  },
},
(context, req, res,) {
  req.params; // type Readonly<{}>;
  console.log(req.params.id); // value
  myValidationLibrary.validate({ params: req.params });
});
```
