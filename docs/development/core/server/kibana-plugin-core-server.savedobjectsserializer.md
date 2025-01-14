<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsSerializer](./kibana-plugin-core-server.savedobjectsserializer.md)

## SavedObjectsSerializer class

A serializer that can be used to manually convert [raw](./kibana-plugin-core-server.savedobjectsrawdoc.md) or [sanitized](./kibana-plugin-core-server.savedobjectsanitizeddoc.md) documents to the other kind.

**Signature:**

```typescript
export declare class SavedObjectsSerializer 
```

## Remarks

Serializer instances should only be created and accessed by calling [SavedObjectsServiceStart.createSerializer](./kibana-plugin-core-server.savedobjectsservicestart.createserializer.md)

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `SavedObjectsSerializer` class.

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [generateRawId(namespace, type, id)](./kibana-plugin-core-server.savedobjectsserializer.generaterawid.md) |  | Given a saved object type and id, generates the compound id that is stored in the raw document. |
|  [generateRawLegacyUrlAliasId(namespace, type, id)](./kibana-plugin-core-server.savedobjectsserializer.generaterawlegacyurlaliasid.md) |  | Given a saved object type and id, generates the compound id that is stored in the raw document for its legacy URL alias. |
|  [isRawSavedObject(doc, options)](./kibana-plugin-core-server.savedobjectsserializer.israwsavedobject.md) |  | Determines whether or not the raw document can be converted to a saved object. |
|  [rawToSavedObject(doc, options)](./kibana-plugin-core-server.savedobjectsserializer.rawtosavedobject.md) |  | Converts a document from the format that is stored in elasticsearch to the saved object client format. |
|  [savedObjectToRaw(savedObj)](./kibana-plugin-core-server.savedobjectsserializer.savedobjecttoraw.md) |  | Converts a document from the saved object client format to the format that is stored in elasticsearch. |

