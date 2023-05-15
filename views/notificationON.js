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
const database = firebase.database();

var token ='';


const getFCMToken = async () => {
    await messaging.getToken(messaging, {vapid: "BLmfEuPd7yJk2IPFzLCF1aRAbHRcjf-tyfmN6aZ-u5vAYAWSJgWuXsZyrX55aoPfAuuosZ8rbO3j0AR22L5pY6I"}).then((a) => {token = a})
    return token;
}

const showFCMToken = async () =>{
    await getFCMToken();
    console.log(token);
    
}

const addUserDB = async (value) =>{
    const username = value;
    console.log(username);
    database.ref(`Tokens/${username}`).set(await getFCMToken())
        .then(()=>{
            console.log("inserita correttamente");
        })
        .catch((error) =>{
            console.log(error);
        })
    return username;
}

 

const requestPermission = () =>{
    console.log("dentro il request");
    messaging.requestPermission().then(async () => {
        token = await getFCMToken();
        location.reload(true);
    }).catch((err) => {
        alert("You've blocked the notifications. Please check your browser settings");
        
    });
}

const USERS = firebase.database().ref('Tokens/');


const getUsers = () => {
    return new Promise((resolve, reject) => {
        USERS.once('value', (snapshot) => {
            var usersArr = [];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                usersArr.push(childKey);
            })
            console.log("stampa array ", usersArr);
            resolve(usersArr);
        })
    })

}

if(Notification.permission=="granted"){
    showFCMToken();
}
     