const CACHE_NAME = 'cepc-schede-v9';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './maskable-icon.svg',
  './logo-dark.html',
  './logo-light.html',
  './pulizie/scheda1.html',
  './pulizie/scheda3.html',
  './pulizie/scheda4.html',
  './pulizie/scheda5.html',
  './pulizie/scheda6.html',
  './pulizie/scheda7.html',
  './pulizie/scheda8.html',
  './pulizie/scheda9.html',
  './pulizie/scheda10.html',
  './pulizie/scheda11.html',
  './pulizie/scheda12.html',
  './pulizie/scheda13.html',
  './pulizie/scheda14.html',
  './pulizie/scheda15.html',
  './pulizie/scheda16.html',
  './pulizie/scheda17.html',
  './pulizie/scheda18.html',
  './pulizie/scheda19.html',
  './pulizie/scheda20.html',
  './pulizie/scheda21.html',
  './pulizie/scheda22.html',
  './pulizie/scheda23.html',
  './pulizie/scheda24.html'
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
  const isSheet = requestUrl.pathname.includes('/pulizie/');

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
