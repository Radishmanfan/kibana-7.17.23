<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsFindResult](./kibana-plugin-core-server.savedobjectsfindresult.md)

## SavedObjectsFindResult interface


**Signature:**

```typescript
export interface SavedObjectsFindResult<T = unknown> extends SavedObject<T> 
```
**Extends:** SavedObject&lt;T&gt;

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [score](./kibana-plugin-core-server.savedobjectsfindresult.score.md) |  | number | The Elasticsearch <code>_score</code> of this result. |
|  [sort?](./kibana-plugin-core-server.savedobjectsfindresult.sort.md) |  | string\[\] | _(Optional)_ The Elasticsearch <code>sort</code> value of this result. |

