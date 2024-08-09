<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [IExternalUrlPolicy](./kibana-plugin-core-server.iexternalurlpolicy.md)

## IExternalUrlPolicy interface

A policy describing whether access to an external destination is allowed.

**Signature:**

```typescript
export interface IExternalUrlPolicy 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [allow](./kibana-plugin-core-server.iexternalurlpolicy.allow.md) |  | boolean | Indicates if this policy allows or denies access to the described destination. |
|  [host?](./kibana-plugin-core-server.iexternalurlpolicy.host.md) |  | string | _(Optional)_ Optional host describing the external destination. May be combined with <code>protocol</code>. |
|  [protocol?](./kibana-plugin-core-server.iexternalurlpolicy.protocol.md) |  | string | _(Optional)_ Optional protocol describing the external destination. May be combined with <code>host</code>. |
