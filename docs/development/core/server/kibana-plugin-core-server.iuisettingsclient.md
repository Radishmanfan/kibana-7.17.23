<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [IUiSettingsClient](./kibana-plugin-core-server.iuisettingsclient.md)

## IUiSettingsClient interface

Server-side client that provides access to the advanced settings stored in elasticsearch. The settings provide control over the behavior of the Kibana application. For example, a user can specify how to display numeric or date fields. Users can adjust the settings via Management UI.

**Signature:**

```typescript
export interface IUiSettingsClient 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [get](./kibana-plugin-core-server.iuisettingsclient.get.md) |  | &lt;T = any&gt;(key: string) =&gt; Promise&lt;T&gt; | Retrieves uiSettings values set by the user with fallbacks to default values if not specified. |
|  [getAll](./kibana-plugin-core-server.iuisettingsclient.getall.md) |  | &lt;T = any&gt;() =&gt; Promise&lt;Record&lt;string, T&gt;&gt; | Retrieves a set of all uiSettings values set by the user with fallbacks to default values if not specified. |
|  [getRegistered](./kibana-plugin-core-server.iuisettingsclient.getregistered.md) |  | () =&gt; Readonly&lt;Record&lt;string, PublicUiSettingsParams&gt;&gt; | Returns registered uiSettings values [UiSettingsParams](./kibana-plugin-core-server.uisettingsparams.md) |
|  [getUserProvided](./kibana-plugin-core-server.iuisettingsclient.getuserprovided.md) |  | &lt;T = any&gt;() =&gt; Promise&lt;Record&lt;string, UserProvidedValues&lt;T&gt;&gt;&gt; | Retrieves a set of all uiSettings values set by the user. |
|  [isOverridden](./kibana-plugin-core-server.iuisettingsclient.isoverridden.md) |  | (key: string) =&gt; boolean | Shows whether the uiSettings value set by the user. |
|  [isSensitive](./kibana-plugin-core-server.iuisettingsclient.issensitive.md) |  | (key: string) =&gt; boolean | Shows whether the uiSetting is a sensitive value. Used by telemetry to not send sensitive values. |
|  [remove](./kibana-plugin-core-server.iuisettingsclient.remove.md) |  | (key: string) =&gt; Promise&lt;void&gt; | Removes uiSettings value by key. |
|  [removeMany](./kibana-plugin-core-server.iuisettingsclient.removemany.md) |  | (keys: string\[\]) =&gt; Promise&lt;void&gt; | Removes multiple uiSettings values by keys. |
|  [set](./kibana-plugin-core-server.iuisettingsclient.set.md) |  | (key: string, value: any) =&gt; Promise&lt;void&gt; | Writes uiSettings value and marks it as set by the user. |
|  [setMany](./kibana-plugin-core-server.iuisettingsclient.setmany.md) |  | (changes: Record&lt;string, any&gt;) =&gt; Promise&lt;void&gt; | Writes multiple uiSettings values and marks them as set by the user. |

