<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [HandlerFunction](./kibana-plugin-core-server.handlerfunction.md)

## HandlerFunction type

A function that accepts a context object and an optional number of additional arguments. Used for the generic types in [IContextContainer](./kibana-plugin-core-server.icontextcontainer.md)

**Signature:**

```typescript
export declare type HandlerFunction<T extends object> = (context: T, ...args: any[]) => any;
```
