<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [IHttpInterceptController](./kibana-plugin-core-public.ihttpinterceptcontroller.md)

## IHttpInterceptController interface

Used to halt a request Promise chain in a [HttpInterceptor](./kibana-plugin-core-public.httpinterceptor.md)<!-- -->.

**Signature:**

```typescript
export interface IHttpInterceptController 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [halted](./kibana-plugin-core-public.ihttpinterceptcontroller.halted.md) |  | boolean | Whether or not this chain has been halted. |

## Methods

|  Method | Description |
|  --- | --- |
|  [halt()](./kibana-plugin-core-public.ihttpinterceptcontroller.halt.md) | Halt the request Promise chain and do not process further interceptors or response handlers. |

