<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectSanitizedDoc](./kibana-plugin-core-server.savedobjectsanitizeddoc.md)

## SavedObjectSanitizedDoc type

Describes Saved Object documents that have passed through the migration framework and are guaranteed to have a `references` root property.

**Signature:**

```typescript
export declare type SavedObjectSanitizedDoc<T = unknown> = SavedObjectDoc<T> & Referencable;
```
