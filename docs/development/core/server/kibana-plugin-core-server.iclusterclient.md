<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [IClusterClient](./kibana-plugin-core-server.iclusterclient.md)

## IClusterClient interface

Represents an Elasticsearch cluster API client created by the platform. It allows to call API on behalf of the internal Kibana user and the actual user that is derived from the request headers (via `asScoped(...)`<!-- -->).

**Signature:**

```typescript
export interface IClusterClient 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [asInternalUser](./kibana-plugin-core-server.iclusterclient.asinternaluser.md) | <code>readonly</code> | ElasticsearchClient | A [client](./kibana-plugin-core-server.elasticsearchclient.md) to be used to query the ES cluster on behalf of the Kibana internal user |
|  [asScoped](./kibana-plugin-core-server.iclusterclient.asscoped.md) |  | (request: ScopeableRequest) =&gt; IScopedClusterClient | Creates a [scoped cluster client](./kibana-plugin-core-server.iscopedclusterclient.md) bound to given [request](./kibana-plugin-core-server.scopeablerequest.md) |
