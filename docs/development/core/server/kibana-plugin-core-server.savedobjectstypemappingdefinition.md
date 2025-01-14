<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsTypeMappingDefinition](./kibana-plugin-core-server.savedobjectstypemappingdefinition.md)

## SavedObjectsTypeMappingDefinition interface

Describe a saved object type mapping.

**Signature:**

```typescript
export interface SavedObjectsTypeMappingDefinition 
```

## Example


```ts
const typeDefinition: SavedObjectsTypeMappingDefinition = {
  properties: {
    enabled: {
      type: "boolean"
    },
    sendUsageFrom: {
      ignore_above: 256,
      type: "keyword"
    },
    lastReported: {
      type: "date"
    },
    lastVersionChecked: {
      ignore_above: 256,
      type: "keyword"
    },
  }
}
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [dynamic?](./kibana-plugin-core-server.savedobjectstypemappingdefinition.dynamic.md) |  | false \| 'strict' | _(Optional)_ The dynamic property of the mapping, either <code>false</code> or <code>'strict'</code>. If unspecified <code>dynamic: 'strict'</code> will be inherited from the top-level index mappings. |
|  [properties](./kibana-plugin-core-server.savedobjectstypemappingdefinition.properties.md) |  | SavedObjectsMappingProperties | The underlying properties of the type mapping |

