<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [AuthenticationHandler](./kibana-plugin-core-server.authenticationhandler.md)

## AuthenticationHandler type

See [AuthToolkit](./kibana-plugin-core-server.authtoolkit.md)<!-- -->.

**Signature:**

```typescript
export declare type AuthenticationHandler = (request: KibanaRequest, response: LifecycleResponseFactory, toolkit: AuthToolkit) => AuthResult | IKibanaResponse | Promise<AuthResult | IKibanaResponse>;
```
