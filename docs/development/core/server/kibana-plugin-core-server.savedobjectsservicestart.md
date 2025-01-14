<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsServiceStart](./kibana-plugin-core-server.savedobjectsservicestart.md)

## SavedObjectsServiceStart interface

Saved Objects is Kibana's data persisentence mechanism allowing plugins to use Elasticsearch for storing and querying state. The SavedObjectsServiceStart API provides a scoped Saved Objects client for interacting with Saved Objects.

**Signature:**

```typescript
export interface SavedObjectsServiceStart 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [createExporter](./kibana-plugin-core-server.savedobjectsservicestart.createexporter.md) |  | (client: SavedObjectsClientContract) =&gt; ISavedObjectsExporter | Creates an [exporter](./kibana-plugin-core-server.isavedobjectsexporter.md) bound to given client. |
|  [createImporter](./kibana-plugin-core-server.savedobjectsservicestart.createimporter.md) |  | (client: SavedObjectsClientContract) =&gt; ISavedObjectsImporter | Creates an [importer](./kibana-plugin-core-server.isavedobjectsimporter.md) bound to given client. |
|  [createInternalRepository](./kibana-plugin-core-server.savedobjectsservicestart.createinternalrepository.md) |  | (includedHiddenTypes?: string\[\]) =&gt; ISavedObjectsRepository | Creates a [Saved Objects repository](./kibana-plugin-core-server.isavedobjectsrepository.md) that uses the internal Kibana user for authenticating with Elasticsearch. |
|  [createScopedRepository](./kibana-plugin-core-server.savedobjectsservicestart.createscopedrepository.md) |  | (req: KibanaRequest, includedHiddenTypes?: string\[\]) =&gt; ISavedObjectsRepository | Creates a [Saved Objects repository](./kibana-plugin-core-server.isavedobjectsrepository.md) that uses the credentials from the passed in request to authenticate with Elasticsearch. |
|  [createSerializer](./kibana-plugin-core-server.savedobjectsservicestart.createserializer.md) |  | () =&gt; SavedObjectsSerializer | Creates a [serializer](./kibana-plugin-core-server.savedobjectsserializer.md) that is aware of all registered types. |
|  [getScopedClient](./kibana-plugin-core-server.savedobjectsservicestart.getscopedclient.md) |  | (req: KibanaRequest, options?: SavedObjectsClientProviderOptions) =&gt; SavedObjectsClientContract | <p>Creates a [Saved Objects client](./kibana-plugin-core-server.savedobjectsclientcontract.md) that uses the credentials from the passed in request to authenticate with Elasticsearch. If other plugins have registered Saved Objects client wrappers, these will be applied to extend the functionality of the client.</p><p>A client that is already scoped to the incoming request is also exposed from the route handler context see [RequestHandlerContext](./kibana-plugin-core-server.requesthandlercontext.md)<!-- -->.</p> |
|  [getTypeRegistry](./kibana-plugin-core-server.savedobjectsservicestart.gettyperegistry.md) |  | () =&gt; ISavedObjectTypeRegistry | Returns the [registry](./kibana-plugin-core-server.isavedobjecttyperegistry.md) containing all registered [saved object types](./kibana-plugin-core-server.savedobjectstype.md) |

