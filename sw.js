// Service worker: precache everything so the game runs fully offline after one visit.
// Paths are relative so the cache matches the GitHub Pages project URL (/get-em-baden/).
const CACHE = 'getem-pages-1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
];

async function putAsset(cache, asset) {
  const res = await fetch(asset, { cache: 'reload' });
  if (!res.ok) throw new Error(asset + ' ' + res.status);
  // cache.put rejects redirected responses, which would abort the whole precache.
  if (res.redirected) {
    const headers = new Headers(res.headers);
    const clean = new Response(await res.blob(), { status: 200, statusText: 'OK', headers });
    await cache.put(asset, clean);
    return;
  }
  await cache.put(asset, res);
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const failed = [];
    for (const asset of ASSETS) {
      try { await putAsset(cache, asset); }
      catch (err) { failed.push(String(err)); }
    }
    if (failed.length) throw new Error(failed.join('; '));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function offlinePage() {
  return (await caches.match('./index.html', { ignoreSearch: true }))
    || (await caches.match('./', { ignoreSearch: true }));
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        try {
          const cache = await caches.open(CACHE);
          await putAsset(cache, './index.html');
        } catch (err) { /* keep the network response even if the cache update fails */ }
        return fresh;
      } catch (err) {
        const hit = await offlinePage();
        if (hit) return hit;
        return new Response('Offline and no cached game.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    const fresh = await fetch(req);
    if (fresh && fresh.ok && !fresh.redirected) {
      const cache = await caches.open(CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  })());
});
