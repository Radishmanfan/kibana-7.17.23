<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [AsyncPlugin](./kibana-plugin-core-public.asyncplugin.md)

## AsyncPlugin interface

> Warning: This API is now obsolete.
> 
> Asynchronous lifecycles are deprecated, and should be migrated to sync 
> 

A plugin with asynchronous lifecycle methods.

**Signature:**

```typescript
export interface AsyncPlugin<TSetup = void, TStart = void, TPluginsSetup extends object = object, TPluginsStart extends object = object> 
```

## Methods

|  Method | Description |
|  --- | --- |
|  [setup(core, plugins)](./kibana-plugin-core-public.asyncplugin.setup.md) |  |
|  [start(core, plugins)](./kibana-plugin-core-public.asyncplugin.start.md) |  |
|  [stop()?](./kibana-plugin-core-public.asyncplugin.stop.md) | _(Optional)_ |

