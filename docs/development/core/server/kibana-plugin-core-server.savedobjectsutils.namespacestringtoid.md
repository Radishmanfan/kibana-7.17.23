<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsUtils](./kibana-plugin-core-server.savedobjectsutils.md) &gt; [namespaceStringToId](./kibana-plugin-core-server.savedobjectsutils.namespacestringtoid.md)

## SavedObjectsUtils.namespaceStringToId property

Converts a given saved object namespace string to its ID representation. All namespace strings have an identical ID representation, with the exception of the `'default'` namespace string (which has a namespace ID of `undefined`<!-- -->).

**Signature:**

```typescript
static namespaceStringToId: (namespace: string) => string | undefined;
```
