importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyARM97493F50pd_QXhR6vRKIn897Q9yKQc",
  authDomain: "benestarpwa.firebaseapp.com",
  projectId: "benestarpwa",
  storageBucket: "benestarpwa.appspot.com",
  messagingSenderId: "487141570676",
  appId: "1:487141570676:web:83af17edc0d0d0b6b5b921"
});

const messaging = firebase.messaging();

// ✅ Notificación en segundo plano (cuando el sitio no está abierto)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje recibido en background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || 'icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
