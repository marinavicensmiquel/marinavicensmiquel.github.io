// service-worker.js
// ===================================================
// Este archivo permite que la PWA reciba notificaciones
// incluso si la app está cerrada o el móvil bloqueado.
// ===================================================

// Escucha eventos 'push' (desde el servidor)
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '✨ Notificación Benestar';
  const options = {
    body: data.body || 'Bon dia! 🌞',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Escucha cuando el usuario toca la notificación
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://marinavicensmiquel.github.io/web_benestar')
  );
});
