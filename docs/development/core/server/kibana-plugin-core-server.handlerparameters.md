<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [HandlerParameters](./kibana-plugin-core-server.handlerparameters.md)

## HandlerParameters type

Extracts the types of the additional arguments of a [HandlerFunction](./kibana-plugin-core-server.handlerfunction.md)<!-- -->, excluding the [HandlerContextType](./kibana-plugin-core-server.handlercontexttype.md)<!-- -->.

**Signature:**

```typescript
export declare type HandlerParameters<T extends HandlerFunction<any>> = T extends (context: any, ...args: infer U) => any ? U : never;
```
