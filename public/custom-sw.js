// This is a custom service worker to enhance the next-pwa generated service worker

// Cache name for app shell resources
const CACHE_NAME = "football-tournament-cache-v1";

// URLs to cache for offline access
const URLS_TO_CACHE = [
  "/",
  "/offline",
  "/matches",
  "/standings",
  "/info",
  "/favicon.ico",
  "/manifest.json",
  "/sounds/click.mp3",
  "/sounds/edit.mp3",
  "/sounds/game-start.mp3",
  "/sounds/goal.mp3",
];

// Install event - cache essential resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Custom service worker caching app shell");
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => {
        // Skip waiting to ensure the new service worker activates immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("football-tournament-") &&
                cacheName !== CACHE_NAME
              );
            })
            .map((cacheName) => {
              console.log("Deleting outdated cache:", cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Claim clients to ensure the new service worker takes over
        return self.clients.claim();
      })
  );
});

// Fetch event - network-first strategy with offline fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Handle API requests (localStorage data)
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline");
      })
    );
    return;
  }

  // Handle navigation requests (HTML pages)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline") || caches.match("/");
      })
    );
    return;
  }

  // For all other requests, try network first, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response for caching
        const responseToCache = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // For image requests, return a fallback if available
          if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return caches.match("/icons/icon-192x192.png");
          }

          // For font requests, just fail silently
          if (event.request.url.match(/\.(woff|woff2|ttf|eot)$/)) {
            return new Response("", {
              status: 400,
              statusText: "Font not available offline",
            });
          }

          // For all other requests, return the offline page
          return caches.match("/offline");
        });
      })
  );
});
