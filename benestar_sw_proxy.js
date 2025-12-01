// sw-proxy.js
// Redirige el registro del service worker al archivo dentro de /web_benestar/
(async () => {
  const originalRegister = navigator.serviceWorker.register;
  navigator.serviceWorker.register = async function (url, options) {
    if (url === "firebase-messaging-sw.js" || url.endsWith("/firebase-messaging-sw.js")) {
      const redirected = "/web_benestar/firebase-messaging-sw.js";
      console.log("🔄 Redirigiendo registro de SW hacia:", redirected);
      return originalRegister.call(navigator.serviceWorker, redirected, options);
    }
    return originalRegister.call(navigator.serviceWorker, url, options);
  };
})();
