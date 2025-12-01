// ===================================================
// Service Worker - Benestar (Debug visual en pantalla)
// ===================================================

// Enviar mensajes de log al cliente (para mostrarlos en pantalla)
function sendLog(msg) {
  self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
    for (const client of clients) {
      client.postMessage({ log: msg });
    }
  });
}

// 📨 Escuchar mensajes enviados desde la app
self.addEventListener("message", (event) => {
  const data = event.data;
  if (data && data.title) {
    sendLog("📩 [SW] Mensaje recibido: " + data.title);
    try {
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || "icon-192.png",
        badge: data.icon || "icon-192.png"
      });
      sendLog("✅ [SW] Notificación intentada");
    } catch (e) {
      sendLog("💥 [SW] Error mostrando notificación: " + e.message);
    }
  } else {
    sendLog("⚠️ [SW] Mensaje sin título recibido");
  }
});
