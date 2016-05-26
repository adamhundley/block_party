import Firebase from 'firebase';
import { database } from 'firebase/database';

export function returnTopScore(firebase) {
  const config = {
      apiKey: "AIzaSyCxpeYfU-xYBk1L7DhJAm-RPsouZn5Vzq8",
      authDomain: "project-4809345059563785920.firebaseapp.com",
      databaseURL: "https://project-4809345059563785920.firebaseio.com",
      storageBucket: "",
    };

  let firebaseApp = firebase.initializeApp(config);
  let firebaseDB = firebaseApp.database();

  let topScore = firebaseDB.ref('highscore/').on('value', function(scores){
    return scores.val().topscore;
  });

  return topScore;
};
