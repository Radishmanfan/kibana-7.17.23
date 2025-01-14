<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [IExternalUrl](./kibana-plugin-core-public.iexternalurl.md) &gt; [validateUrl](./kibana-plugin-core-public.iexternalurl.validateurl.md)

## IExternalUrl.validateUrl() method

Determines if the provided URL is a valid location to send users. Validation is based on the configured allow list in kibana.yml.

If the URL is valid, then a URL will be returned. Otherwise, this will return null.

**Signature:**

```typescript
validateUrl(relativeOrAbsoluteUrl: string): URL | null;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  relativeOrAbsoluteUrl | string |  |

**Returns:**

URL \| null

