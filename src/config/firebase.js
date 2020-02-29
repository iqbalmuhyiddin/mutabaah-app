import * as firebase from "firebase/app";
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
export default firebase;

export const db = firebase.firestore();

db.enablePersistence().catch(err => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    console.log("persistance failed");
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    console.log("persistance not available");
  }
});
