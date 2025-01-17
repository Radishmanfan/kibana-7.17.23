<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [OverlayBannersStart](./kibana-plugin-core-public.overlaybannersstart.md) &gt; [add](./kibana-plugin-core-public.overlaybannersstart.add.md)

## OverlayBannersStart.add() method

Add a new banner

**Signature:**

```typescript
add(mount: MountPoint, priority?: number): string;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  mount | MountPoint | [MountPoint](./kibana-plugin-core-public.mountpoint.md) |
|  priority | number | _(Optional)_ optional priority order to display this banner. Higher priority values are shown first. |

**Returns:**

string

a unique identifier for the given banner to be used with [OverlayBannersStart.remove()](./kibana-plugin-core-public.overlaybannersstart.remove.md) and [OverlayBannersStart.replace()](./kibana-plugin-core-public.overlaybannersstart.replace.md)

