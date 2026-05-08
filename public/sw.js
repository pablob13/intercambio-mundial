// =====================================================
// Mundial Estampas — Service Worker
// Estrategia: Cache-first para assets estáticos,
// Network-first para llamadas a Supabase/APIs.
// =====================================================

const CACHE_NAME = 'mundial-estampas-v1';

// Archivos del app shell que se cachean al instalar
const APP_SHELL = [
  '/',
  '/index.html',
  '/logo.png',
  '/favicon.svg',
  '/manifest.json',
  '/ad1.jpg',
  '/ad2.jpg',
  '/terminos.html',
  '/privacidad.html',
];

// ── Install: cachear el app shell ──────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  // Activar inmediatamente sin esperar a que cierren otras pestañas
  self.skipWaiting();
});

// ── Activate: limpiar cachés viejos ────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  // Tomar control de todas las pestañas abiertas inmediatamente
  self.clients.claim();
});

// ── Fetch: estrategia híbrida ───────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Supabase, Google, Stripe → siempre red (nunca cachear datos privados)
  const networkOnlyHosts = [
    'supabase.co',
    'googleapis.com',
    'googlesyndication.com',
    'stripe.com',
    'buy.stripe.com',
  ];
  if (networkOnlyHosts.some((host) => url.hostname.includes(host))) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // 2. Assets JS/CSS generados por Vite (tienen hash en el nombre) → Cache-first
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 3. Navegación (HTML) → Network-first con fallback al index.html cacheado
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 4. Todo lo demás → Network-first con fallback a caché
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
