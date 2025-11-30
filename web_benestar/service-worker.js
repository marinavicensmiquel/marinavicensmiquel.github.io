// ===================================================
// Service Worker - Benestar PWA
// ===================================================
// Permite mostrar notificaciones tanto locales (desde la app)
// como push (desde servidor). Compatible con iOS y Android.
// ===================================================

// 📨 1. Escuchar mensajes enviados desde la app (local)
self.addEventListener('message', event => {
  const data = event.data;
  if (data && data.title) {
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || 'icon-192.png',
      badge: data.icon || 'icon-192.png'
    });
    console.log('[SW] 📢 Notificación local mostrada');
  }
});

// 📡 2. Escuchar notificaciones push (desde un servidor o servicio externo)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '✨ Notificación Benestar';
  const options = {
    body: data.body || 'Bon dia! 🌞',
    icon: data.icon || 'icon-192.png',
    badge: data.icon || 'icon-192.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
  console.log('[SW] 📡 Notificación push recibida');
});

// 👆 3. Cuando el usuario toca la notificación
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('/web_benestar') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://marinavicensmiquel.github.io/web_benestar');
      }
    })
  );
  console.log('[SW] 👆 Notificación clicada');
});
