<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [OpsProcessMetrics](./kibana-plugin-core-server.opsprocessmetrics.md)

## OpsProcessMetrics interface

Process related metrics

**Signature:**

```typescript
export interface OpsProcessMetrics 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [event\_loop\_delay\_histogram](./kibana-plugin-core-server.opsprocessmetrics.event_loop_delay_histogram.md) |  | IntervalHistogram | node event loop delay histogram since last collection |
|  [event\_loop\_delay](./kibana-plugin-core-server.opsprocessmetrics.event_loop_delay.md) |  | number | mean event loop delay since last collection |
|  [memory](./kibana-plugin-core-server.opsprocessmetrics.memory.md) |  | { heap: { total\_in\_bytes: number; used\_in\_bytes: number; size\_limit: number; }; resident\_set\_size\_in\_bytes: number; } | process memory usage |
|  [pid](./kibana-plugin-core-server.opsprocessmetrics.pid.md) |  | number | pid of the kibana process |
|  [uptime\_in\_millis](./kibana-plugin-core-server.opsprocessmetrics.uptime_in_millis.md) |  | number | uptime of the kibana process |

