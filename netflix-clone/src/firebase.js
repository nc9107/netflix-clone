import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAfuKZH8j_nYyYVAJIff6WFDzA84Vyyc88",
  authDomain: "netflix-clone-62c94.firebaseapp.com",
  projectId: "netflix-clone-62c94",
  storageBucket: "netflix-clone-62c94.appspot.com",
  messagingSenderId: "730012557778",
  appId: "1:730012557778:web:45e4a1abcbf8c1266d680b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { auth };

export default db;
