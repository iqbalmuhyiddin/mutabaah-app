import firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyABuJyp3JavFbjllhrdLi5ZE_m-NJbU-t4",
  authDomain: "mutabaah-313ee.firebaseapp.com",
  databaseURL: "https://mutabaah-313ee.firebaseio.com",
  projectId: "mutabaah-313ee",
  storageBucket: "mutabaah-313ee.appspot.com",
  messagingSenderId: "693453382091",
  appId: "1:693453382091:web:2435550b22cbad6108964e",
  measurementId: "G-DJPJ0976Z0"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export default firebase;
