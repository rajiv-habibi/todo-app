import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDhHDDTPf699Vy_FYgQ-gXQw3o_-FuCmQk",
  authDomain: "todo-app-ddf23.firebaseapp.com",
  databaseURL: "https://todo-app-ddf23.firebaseio.com",
  projectId: "todo-app-ddf23",
  storageBucket: "todo-app-ddf23.appspot.com",
  messagingSenderId: "814872982905",
  appId: "1:814872982905:web:cfeef8d4011dbe170d2ba8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database()

export default firebase;

