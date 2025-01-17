<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [ElasticsearchServicePreboot](./kibana-plugin-core-server.elasticsearchservicepreboot.md)

## ElasticsearchServicePreboot interface


**Signature:**

```typescript
export interface ElasticsearchServicePreboot 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [config](./kibana-plugin-core-server.elasticsearchservicepreboot.config.md) | <code>readonly</code> | Readonly&lt;ElasticsearchConfigPreboot&gt; | A limited set of Elasticsearch configuration entries. |
|  [createClient](./kibana-plugin-core-server.elasticsearchservicepreboot.createclient.md) | <code>readonly</code> | (type: string, clientConfig?: Partial&lt;ElasticsearchClientConfig&gt;) =&gt; ICustomClusterClient | Create application specific Elasticsearch cluster API client with customized config. See [IClusterClient](./kibana-plugin-core-server.iclusterclient.md)<!-- -->. |

