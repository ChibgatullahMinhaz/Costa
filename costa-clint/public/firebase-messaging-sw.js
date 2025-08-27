importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB0ZOPwp1wUPFSC_Nrtt_5YI2a_tsHGn3c",
  authDomain: "clints-projects.firebaseapp.com",
  projectId: "clints-projects",
  storageBucket: "clints-projects.firebasestorage.app",
  messagingSenderId: "179232152262",
  appId: "1:179232152262:web:6c8331fa602f707b9dd5c7"       
});


// // ✅ Firebase messaging init
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("📩 Received background message: ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/logo.png",
//     data: {
//       url: payload.fcmOptions?.link || "https://clints-projects.web.app/notification"
//     }
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   event.waitUntil(
//     clients.openWindow(event.notification.data.url)
//   );
// });


// ✅ Initialize messaging

const messaging = firebase.messaging();

//  Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("📩 Received background message: ", payload);

  // 1️⃣ Forward payload to React app (for Swal)
  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });

  // 2️⃣ Show system notification
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
});

// 🔹 Click event (❌ No redirect, just close)
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
});