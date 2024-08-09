<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [ChromeHelpExtension](./kibana-plugin-core-public.chromehelpextension.md)

## ChromeHelpExtension interface


**Signature:**

```typescript
export interface ChromeHelpExtension 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [appName](./kibana-plugin-core-public.chromehelpextension.appname.md) |  | string | Provide your plugin's name to create a header for separation |
|  [content?](./kibana-plugin-core-public.chromehelpextension.content.md) |  | (element: HTMLDivElement) =&gt; () =&gt; void | _(Optional)_ Custom content to occur below the list of links |
|  [links?](./kibana-plugin-core-public.chromehelpextension.links.md) |  | ChromeHelpExtensionMenuLink\[\] | _(Optional)_ Creates unified links for sending users to documentation, GitHub, Discuss, or a custom link/button |
