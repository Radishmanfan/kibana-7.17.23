<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObject](./kibana-plugin-core-server.savedobject.md) &gt; [migrationVersion](./kibana-plugin-core-server.savedobject.migrationversion.md)

## SavedObject.migrationVersion property

Information about the migrations that have been applied to this SavedObject. When Kibana starts up, KibanaMigrator detects outdated documents and migrates them based on this value. For each migration that has been applied, the plugin's name is used as a key and the latest migration version as the value.

**Signature:**

```typescript
migrationVersion?: SavedObjectsMigrationVersion;
```
