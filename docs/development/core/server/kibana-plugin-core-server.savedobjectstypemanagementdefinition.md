<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsTypeManagementDefinition](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.md)

## SavedObjectsTypeManagementDefinition interface

Configuration options for the [type](./kibana-plugin-core-server.savedobjectstype.md)<!-- -->'s management section.

**Signature:**

```typescript
export interface SavedObjectsTypeManagementDefinition<Attributes = any> 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [defaultSearchField?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.defaultsearchfield.md) |  | string | _(Optional)_ The default search field to use for this type. Defaults to <code>id</code>. |
|  [displayName?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.displayname.md) |  | string | _(Optional)_ When specified, will be used instead of the type's name in SO management section's labels. |
|  [getEditUrl?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.getediturl.md) |  | (savedObject: SavedObject&lt;Attributes&gt;) =&gt; string | _(Optional)_ Function returning the url to use to redirect to the editing page of this object. If not defined, editing will not be allowed. |
|  [getInAppUrl?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.getinappurl.md) |  | (savedObject: SavedObject&lt;Attributes&gt;) =&gt; { path: string; uiCapabilitiesPath: string; } | _(Optional)_ Function returning the url to use to redirect to this object from the management section. If not defined, redirecting to the object will not be allowed. |
|  [getTitle?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.gettitle.md) |  | (savedObject: SavedObject&lt;Attributes&gt;) =&gt; string | _(Optional)_ Function returning the title to display in the management table. If not defined, will use the object's type and id to generate a label. |
|  [icon?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.icon.md) |  | string | _(Optional)_ The eui icon name to display in the management table. If not defined, the default icon will be used. |
|  [importableAndExportable?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.importableandexportable.md) |  | boolean | _(Optional)_ Is the type importable or exportable. Defaults to <code>false</code>. |
|  [isExportable?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.isexportable.md) |  | SavedObjectsExportablePredicate&lt;Attributes&gt; | <p>_(Optional)_ Optional hook to specify whether an object should be exportable.</p><p>If specified, <code>isExportable</code> will be called during export for each of this type's objects in the export, and the ones not matching the predicate will be excluded from the export.</p><p>When implementing both <code>isExportable</code> and <code>onExport</code>, it is mandatory that <code>isExportable</code> returns the same value for an object before and after going though the export transform. E.g <code>isExportable(objectBeforeTransform) === isExportable(objectAfterTransform)</code></p> |
|  [onExport?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.onexport.md) |  | SavedObjectsExportTransform&lt;Attributes&gt; | <p>_(Optional)_ An optional export transform function that can be used transform the objects of the registered type during the export process.</p><p>It can be used to either mutate the exported objects, or add additional objects (of any type) to the export list.</p><p>See [the transform type documentation](./kibana-plugin-core-server.savedobjectsexporttransform.md) for more info and examples.</p><p>When implementing both <code>isExportable</code> and <code>onExport</code>, it is mandatory that <code>isExportable</code> returns the same value for an object before and after going though the export transform. E.g <code>isExportable(objectBeforeTransform) === isExportable(objectAfterTransform)</code></p> |
|  [onImport?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.onimport.md) |  | SavedObjectsImportHook&lt;Attributes&gt; | <p>_(Optional)_ An optional [import hook](./kibana-plugin-core-server.savedobjectsimporthook.md) to use when importing given type.</p><p>Import hooks are executed during the savedObjects import process and allow to interact with the imported objects. See the [hook documentation](./kibana-plugin-core-server.savedobjectsimporthook.md) for more info.</p> |
|  [visibleInManagement?](./kibana-plugin-core-server.savedobjectstypemanagementdefinition.visibleinmanagement.md) |  | boolean | _(Optional)_ When set to false, the type will not be listed or searchable in the SO management section. Main usage of setting this property to false for a type is when objects from the type should be included in the export via references or export hooks, but should not directly appear in the SOM. Defaults to <code>true</code>. |
