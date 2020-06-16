// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDicE8wQSGD8TGaj2RQtVRJJfIwtQNn6eU",
    authDomain: "watchful-muse-276102.firebaseapp.com",
    databaseURL: "https://watchful-muse-276102.firebaseio.com",
    projectId: "watchful-muse-276102",
    storageBucket: "watchful-muse-276102.appspot.com",
    messagingSenderId: "270033416605",
    appId: "1:270033416605:web:22963fdf6e1d3ec9503f74",
    measurementId: "G-C6B693S10E"
  };

    // Initialize Firebase and Firestore
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const authentication = firebase.auth();
    const database = firebase.firestore();

    //google api key
    const apiKey = 'AIzaSyDicE8wQSGD8TGaj2RQtVRJJfIwtQNn6eU';