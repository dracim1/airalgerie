const CACHE_NAME = 'sie-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard2.css',
  '/dashboard.js',
  '/chartsJS.js',
  '/manifest.json',
  '/icons/favicon192.png',
  '/icons/favicon512.png'
];

// Installer le Service Worker et mettre en cache les fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activer le Service Worker et supprimer les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Intercepter les requêtes et servir depuis le cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
