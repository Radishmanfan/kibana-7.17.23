<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [HttpResourcesRequestHandler](./kibana-plugin-core-server.httpresourcesrequesthandler.md)

## HttpResourcesRequestHandler type

Extended version of [RequestHandler](./kibana-plugin-core-server.requesthandler.md) having access to [HttpResourcesServiceToolkit](./kibana-plugin-core-server.httpresourcesservicetoolkit.md) to respond with HTML or JS resources.

**Signature:**

```typescript
export declare type HttpResourcesRequestHandler<P = unknown, Q = unknown, B = unknown, Context extends RequestHandlerContext = RequestHandlerContext> = RequestHandler<P, Q, B, Context, 'get', KibanaResponseFactory & HttpResourcesServiceToolkit>;
```

## Example

\`\`\`<!-- -->typescript httpResources.register(<!-- -->{ path: '/login', validate: { params: schema.object(<!-- -->{ id: schema.string() }<!-- -->), }<!-- -->, }<!-- -->, async (context, request, response) =<!-- -->&gt; { //.. return response.renderCoreApp(); }<!-- -->);
