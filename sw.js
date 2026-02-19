const cacheName = 'pwa-cache-v2';
const assetsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/player.html',
  '/player.css',
  '/player.js',
  '/manifest.json',
  '/js/analytics/posthog.js',
  '/js/api/omdb.js',
  '/js/ui/search.js',
  '/js/ui/recently-watched.js',
  '/js/ui/player.js',
  '/js/utils/common.js',
  '/js/utils/storage.js',
  '/js/utils/video-sources.js',
  // Not caching config.js as it may contain sensitive information
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
