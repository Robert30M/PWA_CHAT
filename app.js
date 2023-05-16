import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert {type: 'json'};
import session from 'express-session';


const app = express();
const port = 3500;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: //link del db che si trova all'interno della voce realtime db, possibile implementazione anche con mongo //rimuovere 
});

const tokenDB = admin.database().ref('Tokens/');

app.use(express.static('views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const indexPath = path.join(process.cwd(), 'views/index.html');
    res.sendFile(indexPath);
    location.reload(true);
});

app.get('/chatMessage', (req, res) =>{
  const indexPath = path.join(process.cwd(), 'views/chatMessage.html');
  res.sendFile(indexPath);
});


app.get('/appleGuide', (req, res) =>{
  const indexPath = path.join(process.cwd(), 'views/appleGuide.html');
  res.sendFile(indexPath)
})

app.use(session({
  secret: 'message',
  resave: false,
  saveUninitialized: true
}));

let user = '';
app.post('/', (req, res) => {  
  user = req.body.BTNchat;
  console.log("Username", user);
  res.redirect('/chatMessage');
});

app.post('/chatMessage', (req, res) => {
  const message = req.body.chatText;
  console.log("Messaggio chat", message);
  const payload = {
    notification: {
        'title': user,
        'body': message, 
    }
  };

  const options = {
    priority: "high"
  }

  tokenDB.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log("chiave: ",childKey);
      console.log("valore: ",childData); //chiave
      admin.messaging().sendToDevice(childData, payload, options)
      .catch(error => {
        console.log(error);
      })
    })
  })
  res.redirect('/chatMessage');
});


app.post('/logout', (req, res) =>{
  console.log("valore user", user);
  tokenDB.once('value', (snapshot) =>{
    snapshot.forEach((childSnapshot) =>{
      console.log("key: ",childSnapshot.key);
      const key = childSnapshot.key;
      if(key == user){
        console.log("rimuovi");
        tokenDB.child(user).remove();
      }
    })
  })
  res.redirect('/');
});

app.listen(port, () => console.log("Server ready", {port}));