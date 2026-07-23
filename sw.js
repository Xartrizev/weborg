self.addEventListener('fetch', function(event) {});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.group ? `${data.group} • ${data.title}` : data.title || 'New Message';
  const options = {
    body: data.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' }
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});