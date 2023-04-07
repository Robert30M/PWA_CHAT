importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js");
const firebaseConfig = {
  apiKey: "AIzaSyAkPsE3jPQywZIzB4DIoqWaas6W-l6bJkk",
  authDomain: "pushnoti-9bd26.firebaseapp.com",
  databaseURL: "https://pushnoti-9bd26-default-rtdb.firebaseio.com",
  projectId: "pushnoti-9bd26",
  storageBucket: "pushnoti-9bd26.appspot.com",
  messagingSenderId: "9373725090",
  appId: "1:9373725090:web:f98fc9381d406c2b9bc2fb",
  measurementId: "G-YEWD5QDSSY"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    function getPayload(){
      return payload;
    }
    //self.registration.showNotification(notificationTitle, notificationOptions);
});
