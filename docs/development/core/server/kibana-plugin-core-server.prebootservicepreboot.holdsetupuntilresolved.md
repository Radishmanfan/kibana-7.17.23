<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [PrebootServicePreboot](./kibana-plugin-core-server.prebootservicepreboot.md) &gt; [holdSetupUntilResolved](./kibana-plugin-core-server.prebootservicepreboot.holdsetupuntilresolved.md)

## PrebootServicePreboot.holdSetupUntilResolved property

Registers a `Promise` as a precondition before Kibana can proceed to `setup`<!-- -->. This method can be invoked multiple times and from multiple `preboot` plugins. Kibana will proceed to `setup` only when all registered `Promises` instances are resolved, or it will shut down if any of them is rejected.

**Signature:**

```typescript
readonly holdSetupUntilResolved: (reason: string, promise: Promise<{
        shouldReloadConfig: boolean;
    } | undefined>) => void;
```