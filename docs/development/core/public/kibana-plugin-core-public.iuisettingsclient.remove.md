<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [IUiSettingsClient](./kibana-plugin-core-public.iuisettingsclient.md) &gt; [remove](./kibana-plugin-core-public.iuisettingsclient.remove.md)

## IUiSettingsClient.remove property

Removes the user-defined value for a setting, causing it to revert to the default. This method behaves the same as calling `set(key, null)`<!-- -->, including the synchronization, custom setting, and error behavior of that method.

**Signature:**

```typescript
remove: (key: string) => Promise<boolean>;
```
