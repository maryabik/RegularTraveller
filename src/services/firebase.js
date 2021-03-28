import firebase from 'firebase/app'
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyC7kx7m4EoGccK8-uNB3X6Qrcn_wKDJFyo",
  authDomain: "regulartraveller-c7698.firebaseapp.com",
  projectId: "regulartraveller-c7698",
  storageBucket: "regulartraveller-c7698.appspot.com",
  messagingSenderId: "603341076318",
  appId: "1:603341076318:web:40d8cd21a2519e702981cf"
});

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
};
