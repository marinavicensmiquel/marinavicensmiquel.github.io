// ===================================================
// Service Worker - Benestar (versión debug)
// ===================================================

// Activación inmediata: evita tener que reinstalar o recargar
self.addEventListener("install", (event) => {
  self.skipWaiting();
  sendLog("⚙️ [SW] Instalado y forzado a activarse");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  sendLog("🚀 [SW] Activado y controlando clientes");
});

// Enviar logs visibles al cliente (index.html)
function sendLog(msg) {
  self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
    for (const client of clients) {
      client.postMessage({ log: msg });
    }
  });
}

// Escuchar mensajes de la app y mostrar notificación
self.addEventListener("message", (event) => {
  const data = event.data;
  if (data && data.title) {
    sendLog("📩 [SW] Mensaje recibido: " + data.title);
    try {
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || "icon-192.png",
        badge: data.icon || "icon-192.png",
      });
      sendLog("✅ [SW] showNotification ejecutado");
    } catch (e) {
      sendLog("💥 [SW] Error mostrando notificación: " + e.message);
    }
  } else {
    sendLog("⚠️ [SW] Mensaje sin título recibido");
  }
});
