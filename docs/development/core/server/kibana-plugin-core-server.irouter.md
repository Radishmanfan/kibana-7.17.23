<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [IRouter](./kibana-plugin-core-server.irouter.md)

## IRouter interface

Registers route handlers for specified resource path and method. See [RouteConfig](./kibana-plugin-core-server.routeconfig.md) and [RequestHandler](./kibana-plugin-core-server.requesthandler.md) for more information about arguments to route registrations.

**Signature:**

```typescript
export interface IRouter<Context extends RequestHandlerContext = RequestHandlerContext> 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [delete](./kibana-plugin-core-server.irouter.delete.md) |  | RouteRegistrar&lt;'delete', Context&gt; | Register a route handler for <code>DELETE</code> request. |
|  [get](./kibana-plugin-core-server.irouter.get.md) |  | RouteRegistrar&lt;'get', Context&gt; | Register a route handler for <code>GET</code> request. |
|  [handleLegacyErrors](./kibana-plugin-core-server.irouter.handlelegacyerrors.md) |  | RequestHandlerWrapper | Wrap a router handler to catch and converts legacy boom errors to proper custom errors. |
|  [patch](./kibana-plugin-core-server.irouter.patch.md) |  | RouteRegistrar&lt;'patch', Context&gt; | Register a route handler for <code>PATCH</code> request. |
|  [post](./kibana-plugin-core-server.irouter.post.md) |  | RouteRegistrar&lt;'post', Context&gt; | Register a route handler for <code>POST</code> request. |
|  [put](./kibana-plugin-core-server.irouter.put.md) |  | RouteRegistrar&lt;'put', Context&gt; | Register a route handler for <code>PUT</code> request. |
|  [routerPath](./kibana-plugin-core-server.irouter.routerpath.md) |  | string | Resulted path |

