<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [SavedObjectsImportSuccess](./kibana-plugin-core-public.savedobjectsimportsuccess.md)

## SavedObjectsImportSuccess interface

Represents a successful import.

**Signature:**

```typescript
export interface SavedObjectsImportSuccess 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [createNewCopy?](./kibana-plugin-core-public.savedobjectsimportsuccess.createnewcopy.md) |  | boolean | _(Optional)_ |
|  [destinationId?](./kibana-plugin-core-public.savedobjectsimportsuccess.destinationid.md) |  | string | _(Optional)_ If <code>destinationId</code> is specified, the new object has a new ID that is different from the import ID. |
|  [id](./kibana-plugin-core-public.savedobjectsimportsuccess.id.md) |  | string |  |
|  [meta](./kibana-plugin-core-public.savedobjectsimportsuccess.meta.md) |  | { title?: string; icon?: string; } |  |
|  [overwrite?](./kibana-plugin-core-public.savedobjectsimportsuccess.overwrite.md) |  | boolean | _(Optional)_ If <code>overwrite</code> is specified, this object overwrote an existing one (or will do so, in the case of a pending resolution). |
|  [type](./kibana-plugin-core-public.savedobjectsimportsuccess.type.md) |  | string |  |

