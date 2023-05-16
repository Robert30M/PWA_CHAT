const firebaseConfig = {
    //stesse configurazioni di prima
  };


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const database = firebase.database();

var token ='';


const getFCMToken = async () => {
    await messaging.getToken(messaging, {vapid:""}).then((a) => {token = a})
    return token;
}
/*
    vapid key: è la key pair che si trova in fondo del nella voce cloud messaging in project settings
*/


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
     