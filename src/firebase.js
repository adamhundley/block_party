import 'firebase';

const config = {
    apiKey: "AIzaSyCxpeYfU-xYBk1L7DhJAm-RPsouZn5Vzq8",
    authDomain: "project-4809345059563785920.firebaseapp.com",
    databaseURL: "https://project-4809345059563785920.firebaseio.com",
    storageBucket: "",
  };

const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database().ref('highscore/');
