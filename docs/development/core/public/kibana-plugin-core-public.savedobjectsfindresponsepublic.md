<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [SavedObjectsFindResponsePublic](./kibana-plugin-core-public.savedobjectsfindresponsepublic.md)

## SavedObjectsFindResponsePublic interface

Return type of the Saved Objects `find()` method.

\*Note\*: this type is different between the Public and Server Saved Objects clients.

**Signature:**

```typescript
export interface SavedObjectsFindResponsePublic<T = unknown, A = unknown> extends SavedObjectsBatchResponse<T> 
```
**Extends:** SavedObjectsBatchResponse&lt;T&gt;

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [aggregations?](./kibana-plugin-core-public.savedobjectsfindresponsepublic.aggregations.md) |  | A | _(Optional)_ |
|  [page](./kibana-plugin-core-public.savedobjectsfindresponsepublic.page.md) |  | number |  |
|  [perPage](./kibana-plugin-core-public.savedobjectsfindresponsepublic.perpage.md) |  | number |  |
|  [total](./kibana-plugin-core-public.savedobjectsfindresponsepublic.total.md) |  | number |  |

