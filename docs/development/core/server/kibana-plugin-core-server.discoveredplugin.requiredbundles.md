<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [DiscoveredPlugin](./kibana-plugin-core-server.discoveredplugin.md) &gt; [requiredBundles](./kibana-plugin-core-server.discoveredplugin.requiredbundles.md)

## DiscoveredPlugin.requiredBundles property

List of plugin ids that this plugin's UI code imports modules from that are not in `requiredPlugins`<!-- -->.

**Signature:**

```typescript
readonly requiredBundles: readonly PluginName[];
```

## Remarks

The plugins listed here will be loaded in the browser, even if the plugin is disabled. Required by `@kbn/optimizer` to support cross-plugin imports. "core" and plugins already listed in `requiredPlugins` do not need to be duplicated here.

