<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [HttpResources](./kibana-plugin-core-server.httpresources.md)

## HttpResources interface

HttpResources service is responsible for serving static &amp; dynamic assets for Kibana application via HTTP. Provides API allowing plug-ins to respond with: - a pre-configured HTML page bootstrapping Kibana client app - custom HTML page - custom JS script file.

**Signature:**

```typescript
export interface HttpResources 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [register](./kibana-plugin-core-server.httpresources.register.md) |  | &lt;P, Q, B, Context extends RequestHandlerContext = RequestHandlerContext&gt;(route: RouteConfig&lt;P, Q, B, 'get'&gt;, handler: HttpResourcesRequestHandler&lt;P, Q, B, Context&gt;) =&gt; void | To register a route handler executing passed function to form response. |

