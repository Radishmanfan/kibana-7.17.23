<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [CapabilitiesSetup](./kibana-plugin-core-server.capabilitiessetup.md) &gt; [registerProvider](./kibana-plugin-core-server.capabilitiessetup.registerprovider.md)

## CapabilitiesSetup.registerProvider() method

Register a [CapabilitiesProvider](./kibana-plugin-core-server.capabilitiesprovider.md) to be used to provide [Capabilities](./kibana-plugin-core-server.capabilities.md) when resolving them.

**Signature:**

```typescript
registerProvider(provider: CapabilitiesProvider): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  provider | CapabilitiesProvider |  |

**Returns:**

void

## Example

How to register a plugin's capabilities during setup

```ts
// my-plugin/server/plugin.ts
public setup(core: CoreSetup, deps: {}) {
   core.capabilities.registerProvider(() => {
     return {
       catalogue: {
         myPlugin: true,
       },
       myPlugin: {
         someFeature: true,
         featureDisabledByDefault: false,
       },
     }
   });
}
```

