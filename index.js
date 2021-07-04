// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require('firebase/app');

var firebaseConfig = {
    apiKey: "AIzaSyAEueOnWOKISdbLcQamPq0MvUzmncMQzhs",
    authDomain: "sampleiot-fd848.firebaseapp.com",
    databaseURL: "https://sampleiot-fd848.firebaseio.com",
    projectId: "sampleiot-fd848",
    storageBucket: "sampleiot-fd848.appspot.com",
    messagingSenderId: "531901217759",
    appId: "1:531901217759:web:2bb136a5c19fe5db3ae26a",
    measurementId: "G-44WF384XST"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
//const database = firebase.database();
require('firebase/database');
const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4001, () => {
    console.log('Server Started..');
    writeUserData("1","Test");
});


app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
    console.log('socket connected..', socket.id);
    writeUserData(socket.id,"Test");
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});

function writeUserData(userId, name) {
    firebase.database().ref('users/' + userId).set({
      username: name
    });
  }