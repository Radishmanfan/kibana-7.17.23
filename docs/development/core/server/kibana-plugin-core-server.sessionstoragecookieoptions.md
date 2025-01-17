<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SessionStorageCookieOptions](./kibana-plugin-core-server.sessionstoragecookieoptions.md)

## SessionStorageCookieOptions interface

Configuration used to create HTTP session storage based on top of cookie mechanism.

**Signature:**

```typescript
export interface SessionStorageCookieOptions<T> 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [encryptionKey](./kibana-plugin-core-server.sessionstoragecookieoptions.encryptionkey.md) |  | string | A key used to encrypt a cookie's value. Should be at least 32 characters long. |
|  [isSecure](./kibana-plugin-core-server.sessionstoragecookieoptions.issecure.md) |  | boolean | Flag indicating whether the cookie should be sent only via a secure connection. |
|  [name](./kibana-plugin-core-server.sessionstoragecookieoptions.name.md) |  | string | Name of the session cookie. |
|  [sameSite?](./kibana-plugin-core-server.sessionstoragecookieoptions.samesite.md) |  | 'Strict' \| 'Lax' \| 'None' | _(Optional)_ Defines SameSite attribute of the Set-Cookie Header. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite |
|  [validate](./kibana-plugin-core-server.sessionstoragecookieoptions.validate.md) |  | (sessionValue: T \| T\[\]) =&gt; SessionCookieValidationResult | Function called to validate a cookie's decrypted value. |

