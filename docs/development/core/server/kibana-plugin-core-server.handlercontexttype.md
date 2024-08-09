<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [HandlerContextType](./kibana-plugin-core-server.handlercontexttype.md)

## HandlerContextType type

Extracts the type of the first argument of a [HandlerFunction](./kibana-plugin-core-server.handlerfunction.md) to represent the type of the context.

**Signature:**

```typescript
export declare type HandlerContextType<T extends HandlerFunction<any>> = T extends HandlerFunction<infer U> ? U : never;
```