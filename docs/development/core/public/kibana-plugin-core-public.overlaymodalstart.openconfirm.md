<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [OverlayModalStart](./kibana-plugin-core-public.overlaymodalstart.md) &gt; [openConfirm](./kibana-plugin-core-public.overlaymodalstart.openconfirm.md)

## OverlayModalStart.openConfirm() method

Opens a confirmation modal with the given text or mountpoint as a message. Returns a Promise resolving to `true` if user confirmed or `false` otherwise.

**Signature:**

```typescript
openConfirm(message: MountPoint | string, options?: OverlayModalConfirmOptions): Promise<boolean>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  message | MountPoint \| string | [MountPoint](./kibana-plugin-core-public.mountpoint.md) - string or mountpoint to be used a the confirm message body |
|  options | OverlayModalConfirmOptions | _(Optional)_ [OverlayModalConfirmOptions](./kibana-plugin-core-public.overlaymodalconfirmoptions.md) - options for the confirm modal |

**Returns:**

Promise&lt;boolean&gt;
