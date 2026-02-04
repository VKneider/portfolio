# PWA Guide for PortfolioVK2

This project can be turned into a Progressive Web App without changing Slice.js. The only requirements are a web manifest, a service worker, and HTTPS in production.

## Current state
- `src/App/index.html` is the entry HTML.
- No service worker file was found in `src/`.
- The backend serves static files via `api/index.js` (Express).

## Minimal PWA plan (no framework changes)

### 1) Add a web manifest
Create `src/App/manifest.json` (or move to a static public folder) with name, icons, and colors. Example:

```json
{
  "name": "Victor Kneider - Portfolio",
  "short_name": "Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1D4ED8",
  "icons": [
    { "src": "/images/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Update `src/App/index.html` to include:

```html
<link rel="manifest" href="/App/manifest.json" />
<meta name="theme-color" content="#1D4ED8" />
```

### 2) Add a service worker
Create `src/App/service-worker.js` (or move to a static public folder). A minimal cache-first SW could look like:

```js
const CACHE_NAME = "portfolio-cache-v1";
const CORE_ASSETS = [
  "/",
  "/App/index.js",
  "/App/style.css",
  "/App/index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))))
    )
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
```

### 3) Register the service worker
In `src/App/index.js` (or another entry module), register the SW:

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/App/service-worker.js");
  });
}
```

### 4) Make assets available
- Add icon files under `src/images/icons/` (or any public path that Express serves).
- Ensure Express serves the manifest and service worker as static files.

## Routing considerations
- If you use client-side routes, add a fallback strategy so `/some-route` is served by `index.html` when offline.
- For a minimal setup with a single entry route, the cache-first SW is enough.

## Deployment requirements
- PWA installation requires HTTPS in production.
- If deployed to Vercel (or similar), HTTPS is already handled.

## Optional: Better caching
- Use Workbox to generate a precache manifest and runtime caching rules.
- Add a network-first strategy for API calls if the portfolio hits custom endpoints.

## Where to place files in this repo
- `src/App/manifest.json`
- `src/App/service-worker.js`
- Icon assets under `src/images/icons/`

## Summary
This portfolio can be made a PWA with only 3 additions: a manifest, a service worker, and registration code. Slice.js does not need modification.
