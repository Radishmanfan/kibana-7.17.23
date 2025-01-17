<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [ChromeNavLinks](./kibana-plugin-core-public.chromenavlinks.md) &gt; [enableForcedAppSwitcherNavigation](./kibana-plugin-core-public.chromenavlinks.enableforcedappswitchernavigation.md)

## ChromeNavLinks.enableForcedAppSwitcherNavigation() method

Enable forced navigation mode, which will trigger a page refresh when a nav link is clicked and only the hash is updated.

**Signature:**

```typescript
enableForcedAppSwitcherNavigation(): void;
```
**Returns:**

void

## Remarks

This is only necessary when rendering the status page in place of another app, as links to that app will set the current URL and change the hash, but the routes for the correct are not loaded so nothing will happen. https://github.com/elastic/kibana/pull/29770

Used only by status\_page plugin

