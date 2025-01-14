<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [RequestHandler](./kibana-plugin-core-server.requesthandler.md)

## RequestHandler type

A function executed when route path matched requested resource path. Request handler is expected to return a result of one of [KibanaResponseFactory](./kibana-plugin-core-server.kibanaresponsefactory.md) functions. If anything else is returned, or an error is thrown, the HTTP service will automatically log the error and respond `500 - Internal Server Error`<!-- -->.

**Signature:**

```typescript
export declare type RequestHandler<P = unknown, Q = unknown, B = unknown, Context extends RequestHandlerContext = RequestHandlerContext, Method extends RouteMethod = any, ResponseFactory extends KibanaResponseFactory = KibanaResponseFactory> = (context: Context, request: KibanaRequest<P, Q, B, Method>, response: ResponseFactory) => IKibanaResponse<any> | Promise<IKibanaResponse<any>>;
```

## Example


```ts
const router = httpSetup.createRouter();
// creates a route handler for GET request on 'my-app/path/{id}' path
router.get(
  {
    path: 'path/{id}',
    // defines a validation schema for a named segment of the route path
    validate: {
      params: schema.object({
        id: schema.string(),
      }),
    },
  },
  // function to execute to create a responses
  async (context, request, response) => {
    const data = await context.findObject(request.params.id);
    // creates a command to respond with 'not found' error
    if (!data) return response.notFound();
    // creates a command to send found data to the client
    return response.ok(data);
  }
);
```

