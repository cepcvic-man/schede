const CACHE_NAME = 'cepc-schede-v12';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './maskable-icon.svg'
];

const SHEET_PATHS = [
  '/pulizie/',
  '/elettrodomestici/',
  '/attrezzature/',
  '/sicurezza/',
  '/arredi/',
  '/tessili/',
  '/consumabili/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  const isDocument = request.mode === 'navigate' || request.destination === 'document';
  const isSheet = SHEET_PATHS.some(path => requestUrl.pathname.includes(path));

  if (isDocument || isSheet) {
    event.respondWith(
      fetch(request).then(response => {
        if (!response || response.status !== 200) return response;

        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseCopy));
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (!response || response.status !== 200) return response;

        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseCopy));
        return response;
      });
    })
  );
});
