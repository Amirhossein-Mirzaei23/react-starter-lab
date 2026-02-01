import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
self.clients.claim();

self.addEventListener('push', (event) => {
  let data = {
    title: 'Notification',
    body: 'You have a new message',
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }
    event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
    })
  );
});
/// <reference lib="webworker" />

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// این مثال ساده برای Push (برای توسعه)
// self.addEventListener('push', (event) => {
//   const data = event.data?.json() ?? {};
//   event.waitUntil(
//     self.registration.showNotification(data.title, {
//       body: data.body,
//       icon: 'logo192.png',
//     })
//   );
// });

