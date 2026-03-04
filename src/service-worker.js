const CACHE_NAME = 'portfolio-pwa-v1';
const APP_SHELL = [
  '/',
  '/App/index.html',
  '/App/index.js',
  '/App/style.css',
  '/manifest.json',
  '/images/favicon.ico'
];

const BUNDLE_URLS = [
  '/bundles/bundle.config.json',
  '/routes.js',
  '/sliceConfig.json'
];

const ASSET_PATH_PREFIXES = [
  '/Themes',
  '/Styles',
  '/images',
  '/assets',
  '/Components/Visual/Icon'
];

const ASSET_EXTENSIONS = [
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([...APP_SHELL, ...BUNDLE_URLS]))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))))
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/App/index.html'))
    );
    return;
  }

  if (!isSameOrigin) {
    return;
  }

  const isBundleRequest = requestUrl.pathname.startsWith('/bundles/');
  const isAssetRequest = ASSET_PATH_PREFIXES.some((prefix) => requestUrl.pathname.startsWith(prefix))
    || ASSET_EXTENSIONS.some((ext) => requestUrl.pathname.endsWith(ext));

  if (isBundleRequest) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cached);

          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  if (isAssetRequest) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cached);

          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    )
  );
});
