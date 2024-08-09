<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [AppLeaveConfirmAction](./kibana-plugin-core-public.appleaveconfirmaction.md)

## AppLeaveConfirmAction interface

Action to return from a [AppLeaveHandler](./kibana-plugin-core-public.appleavehandler.md) to show a confirmation message when trying to leave an application.

See 

**Signature:**

```typescript
export interface AppLeaveConfirmAction 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [callback?](./kibana-plugin-core-public.appleaveconfirmaction.callback.md) |  | () =&gt; void | _(Optional)_ |
|  [text](./kibana-plugin-core-public.appleaveconfirmaction.text.md) |  | string |  |
|  [title?](./kibana-plugin-core-public.appleaveconfirmaction.title.md) |  | string | _(Optional)_ |
|  [type](./kibana-plugin-core-public.appleaveconfirmaction.type.md) |  | AppLeaveActionType.confirm |  |
