<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [RouteConfigOptionsBody](./kibana-plugin-core-server.routeconfigoptionsbody.md) &gt; [accepts](./kibana-plugin-core-server.routeconfigoptionsbody.accepts.md)

## RouteConfigOptionsBody.accepts property

A string or an array of strings with the allowed mime types for the endpoint. Use this settings to limit the set of allowed mime types. Note that allowing additional mime types not listed above will not enable them to be parsed, and if parse is true, the request will result in an error response.

Default value: allows parsing of the following mime types: \* application/json \* application/\*+json \* application/octet-stream \* application/x-www-form-urlencoded \* multipart/form-data \* text/\*

**Signature:**

```typescript
accepts?: RouteContentType | RouteContentType[] | string | string[];
```
