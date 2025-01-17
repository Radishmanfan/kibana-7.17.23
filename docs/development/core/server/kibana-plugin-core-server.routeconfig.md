<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [RouteConfig](./kibana-plugin-core-server.routeconfig.md)

## RouteConfig interface

Route specific configuration.

**Signature:**

```typescript
export interface RouteConfig<P, Q, B, Method extends RouteMethod> 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [options?](./kibana-plugin-core-server.routeconfig.options.md) |  | RouteConfigOptions&lt;Method&gt; | _(Optional)_ Additional route options [RouteConfigOptions](./kibana-plugin-core-server.routeconfigoptions.md)<!-- -->. |
|  [path](./kibana-plugin-core-server.routeconfig.path.md) |  | string | The endpoint \_within\_ the router path to register the route. |
|  [validate](./kibana-plugin-core-server.routeconfig.validate.md) |  | RouteValidatorFullConfig&lt;P, Q, B&gt; \| false | A schema created with <code>@kbn/config-schema</code> that every request will be validated against. |

