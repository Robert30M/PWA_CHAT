/*import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' assert {type: 'json'};*/
const admin = require('firebase-admin');
const serviceAccount = require ('../serviceAccountKey.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pushnoti-9bd26-default-rtdb.firebaseio.com"
});

const tokenDB = admin.database().ref('Tokens/')


function sendMessageAll(valueMess){
    const message = valueMess;
    const username = "Carlo";
    console.log(message, username);
    const payload = {
        notification: {
            'title': username,
            'body': message
        }
    };

    const options = {
        priority: "high"
    }

    tokenDB.once('value', (snapshot) =>{
        snapshot.forEach((childSnapshot) =>{
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            console.log(childData);
            admin.messaging().sendToDevice(childData, payload, options)
            .then(function(response){
                console.log(response)
            })
            .catch(error =>{
                console.log(error);
            })
        })
    })


}


function takeUser(value){
    const user = value;
    console.log(user);
}


