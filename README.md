> [!CAUTION]
> This code is non-functional. See https://github.com/cloudflare/workers-sdk/issues/9199, https://github.com/cloudflare/workers-sdk/issues/2805, https://github.com/evanw/esbuild/issues/1275, and https://github.com/rdf-ext/rdf-ext/issues/118 for further details.

---

```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
