<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [ContextSetup](./kibana-plugin-core-server.contextsetup.md)

## ContextSetup interface

An object that handles registration of context providers and configuring handlers with context.

**Signature:**

```typescript
export interface ContextSetup 
```

## Remarks

A [IContextContainer](./kibana-plugin-core-server.icontextcontainer.md) can be used by any Core service or plugin (known as the "service owner") which wishes to expose APIs in a handler function. The container object will manage registering context providers and configuring a handler with all of the contexts that should be exposed to the handler's plugin. This is dependent on the dependencies that the handler's plugin declares.

Contexts providers are executed in the order they were registered. Each provider gets access to context values provided by any plugins that it depends on.

In order to configure a handler with context, you must call the [IContextContainer.createHandler()](./kibana-plugin-core-server.icontextcontainer.createhandler.md) function and use the returned handler which will automatically build a context object when called.

When registering context or creating handlers, the \_calling plugin's opaque id\_ must be provided. This id is passed in via the plugin's initializer and can be accessed from the [PluginInitializerContext.opaqueId](./kibana-plugin-core-server.plugininitializercontext.opaqueid.md) Note this should NOT be the context service owner's id, but the plugin that is actually registering the context or handler.

```ts
// Correct
class MyPlugin {
  private readonly handlers = new Map();

  setup(core) {
    this.contextContainer = core.context.createContextContainer();
    return {
      registerContext(pluginOpaqueId, contextName, provider) {
        this.contextContainer.registerContext(pluginOpaqueId, contextName, provider);
      },
      registerRoute(pluginOpaqueId, path, handler) {
        this.handlers.set(
          path,
          this.contextContainer.createHandler(pluginOpaqueId, handler)
        );
      }
    }
  }
}

// Incorrect
class MyPlugin {
  private readonly handlers = new Map();

  constructor(private readonly initContext: PluginInitializerContext) {}

  setup(core) {
    this.contextContainer = core.context.createContextContainer();
    return {
      registerContext(contextName, provider) {
        // BUG!
        // This would leak this context to all handlers rather that only plugins that depend on the calling plugin.
        this.contextContainer.registerContext(this.initContext.opaqueId, contextName, provider);
      },
      registerRoute(path, handler) {
        this.handlers.set(
          path,
          // BUG!
          // This handler will not receive any contexts provided by other dependencies of the calling plugin.
          this.contextContainer.createHandler(this.initContext.opaqueId, handler)
        );
      }
    }
  }
}
```

## Example

Say we're creating a plugin for rendering visualizations that allows new rendering methods to be registered. If we want to offer context to these rendering methods, we can leverage the ContextService to manage these contexts.

```ts
export interface VizRenderContext {
  core: {
    i18n: I18nStart;
    uiSettings: IUiSettingsClient;
  }
  [contextName: string]: unknown;
}

export type VizRenderer = (context: VizRenderContext, domElement: HTMLElement) => () => void;
// When a renderer is bound via `contextContainer.createHandler` this is the type that will be returned.
type BoundVizRenderer = (domElement: HTMLElement) => () => void;

class VizRenderingPlugin {
  private readonly contextContainer?: IContextContainer<VizRenderer>;
  private readonly vizRenderers = new Map<string, BoundVizRenderer>();

  constructor(private readonly initContext: PluginInitializerContext) {}

  setup(core) {
    this.contextContainer = core.context.createContextContainer();

    return {
      registerContext: this.contextContainer.registerContext,
      registerVizRenderer: (plugin: PluginOpaqueId, renderMethod: string, renderer: VizTypeRenderer) =>
        this.vizRenderers.set(renderMethod, this.contextContainer.createHandler(plugin, renderer)),
    };
  }

  start(core) {
    // Register the core context available to all renderers. Use the VizRendererContext's opaqueId as the first arg.
    this.contextContainer.registerContext(this.initContext.opaqueId, 'core', () => ({
      i18n: core.i18n,
      uiSettings: core.uiSettings
    }));

    return {
      registerContext: this.contextContainer.registerContext,

      renderVizualization: (renderMethod: string, domElement: HTMLElement) => {
        if (!this.vizRenderer.has(renderMethod)) {
          throw new Error(`Render method '${renderMethod}' has not been registered`);
        }

        // The handler can now be called directly with only an `HTMLElement` and will automatically
        // have a new `context` object created and populated by the context container.
        const handler = this.vizRenderers.get(renderMethod)
        return handler(domElement);
      }
    };
  }
}
```

## Methods

|  Method | Description |
|  --- | --- |
|  [createContextContainer()](./kibana-plugin-core-server.contextsetup.createcontextcontainer.md) | Creates a new [IContextContainer](./kibana-plugin-core-server.icontextcontainer.md) for a service owner. |

