<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsFindOptions](./kibana-plugin-core-server.savedobjectsfindoptions.md) &gt; [fields](./kibana-plugin-core-server.savedobjectsfindoptions.fields.md)

## SavedObjectsFindOptions.fields property

An array of fields to include in the results

**Signature:**

```typescript
fields?: string[];
```

## Example

SavedObjects.find(<!-- -->{<!-- -->type: 'dashboard', fields: \['attributes.name', 'attributes.location'\]<!-- -->}<!-- -->)

