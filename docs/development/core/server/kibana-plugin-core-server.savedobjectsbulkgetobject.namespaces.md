<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsBulkGetObject](./kibana-plugin-core-server.savedobjectsbulkgetobject.md) &gt; [namespaces](./kibana-plugin-core-server.savedobjectsbulkgetobject.namespaces.md)

## SavedObjectsBulkGetObject.namespaces property

Optional namespace(s) for the object to be retrieved in. If this is defined, it will supersede the namespace ID that is in the top-level options.

\* For shareable object types (registered with `namespaceType: 'multiple'`<!-- -->): this option can be used to specify one or more spaces, including the "All spaces" identifier (`'*'`<!-- -->). \* For isolated object types (registered with `namespaceType: 'single'` or `namespaceType: 'multiple-isolated'`<!-- -->): this option can only be used to specify a single space, and the "All spaces" identifier (`'*'`<!-- -->) is not allowed. \* For global object types (registered with `namespaceType: 'agnostic'`<!-- -->): this option cannot be used.

**Signature:**

```typescript
namespaces?: string[];
```