<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsClient](./kibana-plugin-core-server.savedobjectsclient.md) &gt; [openPointInTimeForType](./kibana-plugin-core-server.savedobjectsclient.openpointintimefortype.md)

## SavedObjectsClient.openPointInTimeForType() method

Opens a Point In Time (PIT) against the indices for the specified Saved Object types. The returned `id` can then be passed to [SavedObjectsClient.find()](./kibana-plugin-core-server.savedobjectsclient.find.md) to search against that PIT.

Only use this API if you have an advanced use case that's not solved by the [SavedObjectsClient.createPointInTimeFinder()](./kibana-plugin-core-server.savedobjectsclient.createpointintimefinder.md) method.

**Signature:**

```typescript
openPointInTimeForType(type: string | string[], options?: SavedObjectsOpenPointInTimeOptions): Promise<SavedObjectsOpenPointInTimeResponse>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  type | string \| string\[\] |  |
|  options | SavedObjectsOpenPointInTimeOptions | _(Optional)_ |

**Returns:**

Promise&lt;SavedObjectsOpenPointInTimeResponse&gt;

