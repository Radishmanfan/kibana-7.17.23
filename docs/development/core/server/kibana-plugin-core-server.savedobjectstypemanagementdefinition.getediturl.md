<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsTypeManagementDefinition](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.md) &gt; [getEditUrl](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.getediturl.md)

## SavedObjectsTypeManagementDefinition.getEditUrl property

Function returning the url to use to redirect to the editing page of this object. If not defined, editing will not be allowed.

**Signature:**

```typescript
getEditUrl?: (savedObject: SavedObject<Attributes>) => string;
```
