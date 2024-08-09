<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsClient](./kibana-plugin-core-server.savedobjectsclient.md) &gt; [bulkUpdate](./kibana-plugin-core-server.savedobjectsclient.bulkupdate.md)

## SavedObjectsClient.bulkUpdate() method

Bulk Updates multiple SavedObject at once

**Signature:**

```typescript
bulkUpdate<T = unknown>(objects: Array<SavedObjectsBulkUpdateObject<T>>, options?: SavedObjectsBulkUpdateOptions): Promise<SavedObjectsBulkUpdateResponse<T>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  objects | Array&lt;SavedObjectsBulkUpdateObject&lt;T&gt;&gt; |  |
|  options | SavedObjectsBulkUpdateOptions | _(Optional)_ |

**Returns:**

Promise&lt;SavedObjectsBulkUpdateResponse&lt;T&gt;&gt;
