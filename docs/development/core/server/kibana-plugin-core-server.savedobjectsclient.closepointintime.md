<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsClient](./kibana-plugin-core-server.savedobjectsclient.md) &gt; [closePointInTime](./kibana-plugin-core-server.savedobjectsclient.closepointintime.md)

## SavedObjectsClient.closePointInTime() method

Closes a Point In Time (PIT) by ID. This simply proxies the request to ES via the Elasticsearch client, and is included in the Saved Objects Client as a convenience for consumers who are using [SavedObjectsClient.openPointInTimeForType()](./kibana-plugin-core-server.savedobjectsclient.openpointintimefortype.md)<!-- -->.

Only use this API if you have an advanced use case that's not solved by the [SavedObjectsClient.createPointInTimeFinder()](./kibana-plugin-core-server.savedobjectsclient.createpointintimefinder.md) method.

**Signature:**

```typescript
closePointInTime(id: string, options?: SavedObjectsClosePointInTimeOptions): Promise<SavedObjectsClosePointInTimeResponse>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  id | string |  |
|  options | SavedObjectsClosePointInTimeOptions | _(Optional)_ |

**Returns:**

Promise&lt;SavedObjectsClosePointInTimeResponse&gt;

