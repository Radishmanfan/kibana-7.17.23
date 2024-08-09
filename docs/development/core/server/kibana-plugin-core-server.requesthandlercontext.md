<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [RequestHandlerContext](./kibana-plugin-core-server.requesthandlercontext.md)

## RequestHandlerContext interface

Plugin specific context passed to a route handler.

Provides the following clients and services: - [savedObjects.client](./kibana-plugin-core-server.savedobjectsclient.md) - Saved Objects client which uses the credentials of the incoming request - [savedObjects.typeRegistry](./kibana-plugin-core-server.isavedobjecttyperegistry.md) - Type registry containing all the registered types. - [elasticsearch.client](./kibana-plugin-core-server.iscopedclusterclient.md) - Elasticsearch data client which uses the credentials of the incoming request - [uiSettings.client](./kibana-plugin-core-server.iuisettingsclient.md) - uiSettings client which uses the credentials of the incoming request

**Signature:**

```typescript
export interface RequestHandlerContext 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [core](./kibana-plugin-core-server.requesthandlercontext.core.md) |  | { savedObjects: { client: SavedObjectsClientContract; typeRegistry: ISavedObjectTypeRegistry; getClient: (options?: SavedObjectsClientProviderOptions) =&gt; SavedObjectsClientContract; getExporter: (client: SavedObjectsClientContract) =&gt; ISavedObjectsExporter; getImporter: (client: SavedObjectsClientContract) =&gt; ISavedObjectsImporter; }; elasticsearch: { client: IScopedClusterClient; }; uiSettings: { client: IUiSettingsClient; }; deprecations: { client: DeprecationsClient; }; } |  |
