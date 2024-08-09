<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [ServiceStatusLevels](./kibana-plugin-core-server.servicestatuslevels.md)

## ServiceStatusLevels variable

The current "level" of availability of a service.

**Signature:**

```typescript
ServiceStatusLevels: Readonly<{
    available: Readonly<{
        toString: () => "available";
        valueOf: () => 0;
        toJSON: () => "available";
    }>;
    degraded: Readonly<{
        toString: () => "degraded";
        valueOf: () => 1;
        toJSON: () => "degraded";
    }>;
    unavailable: Readonly<{
        toString: () => "unavailable";
        valueOf: () => 2;
        toJSON: () => "unavailable";
    }>;
    critical: Readonly<{
        toString: () => "critical";
        valueOf: () => 3;
        toJSON: () => "critical";
    }>;
}>
```

## Remarks

The values implement `valueOf` to allow for easy comparisons between status levels with &lt;<!-- -->, &gt;<!-- -->, etc. Higher values represent higher severities. Note that the default `Array.prototype.sort` implementation does not correctly sort these values.

A snapshot serializer is available in `src/core/server/test_utils` to ease testing of these values with Jest.
