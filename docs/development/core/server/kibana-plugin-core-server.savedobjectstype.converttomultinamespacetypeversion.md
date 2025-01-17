<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsType](./kibana-plugin-core-server.savedobjectstype.md) &gt; [convertToMultiNamespaceTypeVersion](./kibana-plugin-core-server.savedobjectstype.converttomultinamespacetypeversion.md)

## SavedObjectsType.convertToMultiNamespaceTypeVersion property

If defined, objects of this type will be converted to a 'multiple' or 'multiple-isolated' namespace type when migrating to this version.

Requirements:

1. This string value must be a valid semver version 2. This type must have previously specified [\`namespaceType: 'single'\`](./kibana-plugin-core-server.savedobjectsnamespacetype.md) 3. This type must also specify [\`namespaceType: 'multiple'\`](./kibana-plugin-core-server.savedobjectsnamespacetype.md) \*or\* [\`namespaceType: 'multiple-isolated'\`](./kibana-plugin-core-server.savedobjectsnamespacetype.md)

Example of a single-namespace type in 7.12:

```ts
{
  name: 'foo',
  hidden: false,
  namespaceType: 'single',
  mappings: {...}
}
```
Example after converting to a multi-namespace (isolated) type in 8.0:

```ts
{
  name: 'foo',
  hidden: false,
  namespaceType: 'multiple-isolated',
  mappings: {...},
  convertToMultiNamespaceTypeVersion: '8.0.0'
}
```
Example after converting to a multi-namespace (shareable) type in 8.1:

```ts
{
  name: 'foo',
  hidden: false,
  namespaceType: 'multiple',
  mappings: {...},
  convertToMultiNamespaceTypeVersion: '8.0.0'
}
```
Note: migration function(s) can be optionally specified for any of these versions and will not interfere with the conversion process.

**Signature:**

```typescript
convertToMultiNamespaceTypeVersion?: string;
```
