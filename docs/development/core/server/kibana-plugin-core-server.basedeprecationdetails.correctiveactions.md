<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [BaseDeprecationDetails](./kibana-plugin-core-server.basedeprecationdetails.md) &gt; [correctiveActions](./kibana-plugin-core-server.basedeprecationdetails.correctiveactions.md)

## BaseDeprecationDetails.correctiveActions property

corrective action needed to fix this deprecation.

**Signature:**

```typescript
correctiveActions: {
        api?: {
            path: string;
            method: 'POST' | 'PUT';
            body?: {
                [key: string]: any;
            };
            omitContextFromBody?: boolean;
        };
        manualSteps: string[];
    };
```
