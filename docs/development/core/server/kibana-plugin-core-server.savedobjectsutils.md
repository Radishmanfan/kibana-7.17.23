<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsUtils](./kibana-plugin-core-server.savedobjectsutils.md)

## SavedObjectsUtils class


**Signature:**

```typescript
export declare class SavedObjectsUtils 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [createEmptyFindResponse](./kibana-plugin-core-server.savedobjectsutils.createemptyfindresponse.md) | <code>static</code> | &lt;T, A&gt;({ page, perPage, }: SavedObjectsFindOptions) =&gt; SavedObjectsFindResponse&lt;T, A&gt; | Creates an empty response for a find operation. This is only intended to be used by saved objects client wrappers. |
|  [namespaceIdToString](./kibana-plugin-core-server.savedobjectsutils.namespaceidtostring.md) | <code>static</code> | (namespace?: string) =&gt; string | Converts a given saved object namespace ID to its string representation. All namespace IDs have an identical string representation, with the exception of the <code>undefined</code> namespace ID (which has a namespace string of <code>'default'</code>). |
|  [namespaceStringToId](./kibana-plugin-core-server.savedobjectsutils.namespacestringtoid.md) | <code>static</code> | (namespace: string) =&gt; string \| undefined | Converts a given saved object namespace string to its ID representation. All namespace strings have an identical ID representation, with the exception of the <code>'default'</code> namespace string (which has a namespace ID of <code>undefined</code>). |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [generateId()](./kibana-plugin-core-server.savedobjectsutils.generateid.md) | <code>static</code> | Generates a random ID for a saved objects. |
|  [getConvertedObjectId(namespace, type, id)](./kibana-plugin-core-server.savedobjectsutils.getconvertedobjectid.md) | <code>static</code> | Uses a single-namespace object's "legacy ID" to determine what its new ID will be after it is converted to a multi-namespace type. |
|  [isRandomId(id)](./kibana-plugin-core-server.savedobjectsutils.israndomid.md) | <code>static</code> | Validates that a saved object ID has been randomly generated. |

