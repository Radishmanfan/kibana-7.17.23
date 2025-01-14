<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsIncrementCounterOptions](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.md)

## SavedObjectsIncrementCounterOptions interface


**Signature:**

```typescript
export interface SavedObjectsIncrementCounterOptions<Attributes = unknown> extends SavedObjectsBaseOptions 
```
**Extends:** SavedObjectsBaseOptions

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [initialize?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.initialize.md) |  | boolean | _(Optional)_ (default=false) If true, sets all the counter fields to 0 if they don't already exist. Existing fields will be left as-is and won't be incremented. |
|  [migrationVersion?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.migrationversion.md) |  | SavedObjectsMigrationVersion | _(Optional)_ [SavedObjectsMigrationVersion](./kibana-plugin-core-server.savedobjectsmigrationversion.md) |
|  [refresh?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.refresh.md) |  | MutatingOperationRefreshSetting | _(Optional)_ (default='wait\_for') The Elasticsearch refresh setting for this operation. See [MutatingOperationRefreshSetting](./kibana-plugin-core-server.mutatingoperationrefreshsetting.md) |
|  [upsertAttributes?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.upsertattributes.md) |  | Attributes | _(Optional)_ Attributes to use when upserting the document if it doesn't exist. |

