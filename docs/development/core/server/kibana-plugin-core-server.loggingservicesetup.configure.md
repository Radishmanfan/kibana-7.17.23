<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [LoggingServiceSetup](./kibana-plugin-core-server.loggingservicesetup.md) &gt; [configure](./kibana-plugin-core-server.loggingservicesetup.configure.md)

## LoggingServiceSetup.configure() method

Customizes the logging config for the plugin's context.

**Signature:**

```typescript
configure(config$: Observable<LoggerContextConfigInput>): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  config$ | Observable&lt;LoggerContextConfigInput&gt; |  |

**Returns:**

void

## Remarks

Assumes that that the `context` property of the individual `logger` items emitted by `config$` are relative to the plugin's logging context (defaults to `plugins.<plugin_id>`<!-- -->).

## Example

Customize the configuration for the plugins.data.search context.

```ts
core.logging.configure(
  of({
    appenders: new Map(),
    loggers: [{ name: 'search', appenders: ['default'] }]
  })
)
```

