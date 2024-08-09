<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsCreateOptions](./kibana-plugin-core-server.savedobjectscreateoptions.md)

## SavedObjectsCreateOptions interface


**Signature:**

```typescript
export interface SavedObjectsCreateOptions extends SavedObjectsBaseOptions 
```
**Extends:** SavedObjectsBaseOptions

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [coreMigrationVersion?](./kibana-plugin-core-server.savedobjectscreateoptions.coremigrationversion.md) |  | string | _(Optional)_ A semver value that is used when upgrading objects between Kibana versions. If undefined, this will be automatically set to the current Kibana version when the object is created. If this is set to a non-semver value, or it is set to a semver value greater than the current Kibana version, it will result in an error. |
|  [id?](./kibana-plugin-core-server.savedobjectscreateoptions.id.md) |  | string | _(Optional)_ (not recommended) Specify an id for the document |
|  [initialNamespaces?](./kibana-plugin-core-server.savedobjectscreateoptions.initialnamespaces.md) |  | string\[\] | <p>_(Optional)_ Optional initial namespaces for the object to be created in. If this is defined, it will supersede the namespace ID that is in [SavedObjectsCreateOptions](./kibana-plugin-core-server.savedobjectscreateoptions.md)<!-- -->.</p><p>\* For shareable object types (registered with <code>namespaceType: 'multiple'</code>): this option can be used to specify one or more spaces, including the "All spaces" identifier (<code>'*'</code>). \* For isolated object types (registered with <code>namespaceType: 'single'</code> or <code>namespaceType: 'multiple-isolated'</code>): this option can only be used to specify a single space, and the "All spaces" identifier (<code>'*'</code>) is not allowed. \* For global object types (registered with <code>namespaceType: 'agnostic'</code>): this option cannot be used.</p> |
|  [migrationVersion?](./kibana-plugin-core-server.savedobjectscreateoptions.migrationversion.md) |  | SavedObjectsMigrationVersion | _(Optional)_ Information about the migrations that have been applied to this SavedObject. When Kibana starts up, KibanaMigrator detects outdated documents and migrates them based on this value. For each migration that has been applied, the plugin's name is used as a key and the latest migration version as the value. |
|  [originId?](./kibana-plugin-core-server.savedobjectscreateoptions.originid.md) |  | string | _(Optional)_ Optional ID of the original saved object, if this object's <code>id</code> was regenerated |
|  [overwrite?](./kibana-plugin-core-server.savedobjectscreateoptions.overwrite.md) |  | boolean | _(Optional)_ Overwrite existing documents (defaults to false) |
|  [references?](./kibana-plugin-core-server.savedobjectscreateoptions.references.md) |  | SavedObjectReference\[\] | _(Optional)_ |
|  [refresh?](./kibana-plugin-core-server.savedobjectscreateoptions.refresh.md) |  | MutatingOperationRefreshSetting | _(Optional)_ The Elasticsearch Refresh setting for this operation |
|  [version?](./kibana-plugin-core-server.savedobjectscreateoptions.version.md) |  | string | _(Optional)_ An opaque version number which changes on each successful write operation. Can be used in conjunction with <code>overwrite</code> for implementing optimistic concurrency control. |
