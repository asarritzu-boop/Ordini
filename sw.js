const CACHE_NAME = 'ordini-v1';
// Aggiungi qui i nomi precisi dei file che vuoi disponibili offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icona-192.png',
  './icona-512.png'
];

// Installazione e caching
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione e pulizia vecchia cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Strategia: Network First con fallback su Cache
// Questo assicura che se c'è internet l'app sia aggiornata, altrimenti usa la cache.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
