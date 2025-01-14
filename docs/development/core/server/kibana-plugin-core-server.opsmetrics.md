<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [OpsMetrics](./kibana-plugin-core-server.opsmetrics.md)

## OpsMetrics interface

Regroups metrics gathered by all the collectors. This contains metrics about the os/runtime, the kibana process and the http server.

**Signature:**

```typescript
export interface OpsMetrics 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [collected\_at](./kibana-plugin-core-server.opsmetrics.collected_at.md) |  | Date | Time metrics were recorded at. |
|  [concurrent\_connections](./kibana-plugin-core-server.opsmetrics.concurrent_connections.md) |  | OpsServerMetrics\['concurrent\_connections'\] | number of current concurrent connections to the server |
|  [os](./kibana-plugin-core-server.opsmetrics.os.md) |  | OpsOsMetrics | OS related metrics |
|  [process](./kibana-plugin-core-server.opsmetrics.process.md) |  | OpsProcessMetrics | Process related metrics. |
|  [processes](./kibana-plugin-core-server.opsmetrics.processes.md) |  | OpsProcessMetrics\[\] | Process related metrics. Reports an array of objects for each kibana pid. |
|  [requests](./kibana-plugin-core-server.opsmetrics.requests.md) |  | OpsServerMetrics\['requests'\] | server requests stats |
|  [response\_times](./kibana-plugin-core-server.opsmetrics.response_times.md) |  | OpsServerMetrics\['response\_times'\] | server response time stats |

