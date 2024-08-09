<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [HttpServerInfo](./kibana-plugin-core-server.httpserverinfo.md)

## HttpServerInfo interface

Information about what hostname, port, and protocol the server process is running on. Note that this may not match the URL that end-users access Kibana at. For the public URL, see [BasePath.publicBaseUrl](./kibana-plugin-core-server.basepath.publicbaseurl.md)<!-- -->.

**Signature:**

```typescript
export interface HttpServerInfo 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [hostname](./kibana-plugin-core-server.httpserverinfo.hostname.md) |  | string | The hostname of the server |
|  [name](./kibana-plugin-core-server.httpserverinfo.name.md) |  | string | The name of the Kibana server |
|  [port](./kibana-plugin-core-server.httpserverinfo.port.md) |  | number | The port the server is listening on |
|  [protocol](./kibana-plugin-core-server.httpserverinfo.protocol.md) |  | 'http' \| 'https' \| 'socket' | The protocol used by the server |
