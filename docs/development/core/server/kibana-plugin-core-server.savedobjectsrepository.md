<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsRepository](./kibana-plugin-core-server.savedobjectsrepository.md)

## SavedObjectsRepository class


**Signature:**

```typescript
export declare class SavedObjectsRepository 
```

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [bulkCreate(objects, options)](./kibana-plugin-core-server.savedobjectsrepository.bulkcreate.md) |  | Creates multiple documents at once |
|  [bulkGet(objects, options)](./kibana-plugin-core-server.savedobjectsrepository.bulkget.md) |  | Returns an array of objects by id |
|  [bulkResolve(objects, options)](./kibana-plugin-core-server.savedobjectsrepository.bulkresolve.md) |  | Resolves an array of objects by id, using any legacy URL aliases if they exist |
|  [bulkUpdate(objects, options)](./kibana-plugin-core-server.savedobjectsrepository.bulkupdate.md) |  | Updates multiple objects in bulk |
|  [checkConflicts(objects, options)](./kibana-plugin-core-server.savedobjectsrepository.checkconflicts.md) |  | Check what conflicts will result when creating a given array of saved objects. This includes "unresolvable conflicts", which are multi-namespace objects that exist in a different namespace; such conflicts cannot be resolved/overwritten. |
|  [closePointInTime(id, options)](./kibana-plugin-core-server.savedobjectsrepository.closepointintime.md) |  | <p>Closes a Point In Time (PIT) by ID. This simply proxies the request to ES via the Elasticsearch client, and is included in the Saved Objects Client as a convenience for consumers who are using <code>openPointInTimeForType</code>.</p><p>Only use this API if you have an advanced use case that's not solved by the [SavedObjectsRepository.createPointInTimeFinder()](./kibana-plugin-core-server.savedobjectsrepository.createpointintimefinder.md) method.</p> |
|  [collectMultiNamespaceReferences(objects, options)](./kibana-plugin-core-server.savedobjectsrepository.collectmultinamespacereferences.md) |  | Gets all references and transitive references of the given objects. Ignores any object and/or reference that is not a multi-namespace type. |
|  [create(type, attributes, options)](./kibana-plugin-core-server.savedobjectsrepository.create.md) |  | Persists an object |
|  [createPointInTimeFinder(findOptions, dependencies)](./kibana-plugin-core-server.savedobjectsrepository.createpointintimefinder.md) |  | <p>Returns a [ISavedObjectsPointInTimeFinder](./kibana-plugin-core-server.isavedobjectspointintimefinder.md) to help page through large sets of saved objects. We strongly recommend using this API for any <code>find</code> queries that might return more than 1000 saved objects, however this API is only intended for use in server-side "batch" processing of objects where you are collecting all objects in memory or streaming them back to the client.</p><p>Do NOT use this API in a route handler to facilitate paging through saved objects on the client-side unless you are streaming all of the results back to the client at once. Because the returned generator is stateful, you cannot rely on subsequent http requests retrieving new pages from the same Kibana server in multi-instance deployments.</p><p>This generator wraps calls to [SavedObjectsRepository.find()](./kibana-plugin-core-server.savedobjectsrepository.find.md) and iterates over multiple pages of results using <code>_pit</code> and <code>search_after</code>. This will open a new Point-In-Time (PIT), and continue paging until a set of results is received that's smaller than the designated <code>perPage</code>.</p><p>Once you have retrieved all of the results you need, it is recommended to call <code>close()</code> to clean up the PIT and prevent Elasticsearch from consuming resources unnecessarily. This is only required if you are done iterating and have not yet paged through all of the results: the PIT will automatically be closed for you once you reach the last page of results, or if the underlying call to <code>find</code> fails for any reason.</p> |
|  [delete(type, id, options)](./kibana-plugin-core-server.savedobjectsrepository.delete.md) |  | Deletes an object |
|  [deleteByNamespace(namespace, options)](./kibana-plugin-core-server.savedobjectsrepository.deletebynamespace.md) |  | Deletes all objects from the provided namespace. |
|  [find(options)](./kibana-plugin-core-server.savedobjectsrepository.find.md) |  |  |
|  [get(type, id, options)](./kibana-plugin-core-server.savedobjectsrepository.get.md) |  | Gets a single object |
|  [incrementCounter(type, id, counterFields, options)](./kibana-plugin-core-server.savedobjectsrepository.incrementcounter.md) |  | Increments all the specified counter fields (by one by default). Creates the document if one doesn't exist for the given id. |
|  [openPointInTimeForType(type, { keepAlive, preference })](./kibana-plugin-core-server.savedobjectsrepository.openpointintimefortype.md) |  | <p>Opens a Point In Time (PIT) against the indices for the specified Saved Object types. The returned <code>id</code> can then be passed to <code>SavedObjects.find</code> to search against that PIT.</p><p>Only use this API if you have an advanced use case that's not solved by the [SavedObjectsRepository.createPointInTimeFinder()](./kibana-plugin-core-server.savedobjectsrepository.createpointintimefinder.md) method.</p> |
|  [removeReferencesTo(type, id, options)](./kibana-plugin-core-server.savedobjectsrepository.removereferencesto.md) |  | Updates all objects containing a reference to the given {<!-- -->type, id<!-- -->} tuple to remove the said reference. |
|  [resolve(type, id, options)](./kibana-plugin-core-server.savedobjectsrepository.resolve.md) |  | Resolves a single object, using any legacy URL alias if it exists |
|  [update(type, id, attributes, options)](./kibana-plugin-core-server.savedobjectsrepository.update.md) |  | Updates an object |
|  [updateObjectsSpaces(objects, spacesToAdd, spacesToRemove, options)](./kibana-plugin-core-server.savedobjectsrepository.updateobjectsspaces.md) |  | Updates one or more objects to add and/or remove them from specified spaces. |

