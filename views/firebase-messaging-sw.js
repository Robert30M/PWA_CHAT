importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js");
const firebaseConfig = {
  /*
  all'interno della sezione project setting in firebase console è possibile dentro general scorrendo verso il basso
  trovare il firebaseConfig per la configurazione già generato per l'applicazione creata.
  */
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
    //permette di ricevere il messaggio anche a chi al mittente, crea poi un doppione nelle ricezione del messaggio nel mittente
});
