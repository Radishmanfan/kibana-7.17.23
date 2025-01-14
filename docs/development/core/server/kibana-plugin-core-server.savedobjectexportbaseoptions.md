<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectExportBaseOptions](./kibana-plugin-core-server.savedobjectexportbaseoptions.md)

## SavedObjectExportBaseOptions interface


**Signature:**

```typescript
export interface SavedObjectExportBaseOptions 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [excludeExportDetails?](./kibana-plugin-core-server.savedobjectexportbaseoptions.excludeexportdetails.md) |  | boolean | _(Optional)_ flag to not append [export details](./kibana-plugin-core-server.savedobjectsexportresultdetails.md) to the end of the export stream. |
|  [includeNamespaces?](./kibana-plugin-core-server.savedobjectexportbaseoptions.includenamespaces.md) |  | boolean | _(Optional)_ Flag to also include namespace information in the export stream. By default, namespace information is not included in exported objects. This is only intended to be used internally during copy-to-space operations, and it is not exposed as an option for the external HTTP route for exports. |
|  [includeReferencesDeep?](./kibana-plugin-core-server.savedobjectexportbaseoptions.includereferencesdeep.md) |  | boolean | _(Optional)_ flag to also include all related saved objects in the export stream. |
|  [namespace?](./kibana-plugin-core-server.savedobjectexportbaseoptions.namespace.md) |  | string | _(Optional)_ optional namespace to override the namespace used by the savedObjectsClient. |
|  [request](./kibana-plugin-core-server.savedobjectexportbaseoptions.request.md) |  | KibanaRequest | The http request initiating the export. |

