import React, {useState, useEffect, createContext} from "react";
import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import { signInWithGoogle } from './firebase.js';

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const UserContext = createContext({});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login: () => {
          auth.signInWithPopup(googleProvider).then((res) => {
            console.log(res.user)
            const userID = res.user.uid;
            db.collection("users").doc(userID).set({ userID: userID, email: res.user.email })
              .then(() => window.location.href = "./add");
          }).catch((error) => {
            console.log(error.message)
          })
        },
        logout: () => {
          auth.signOut().then(() => window.location.href = "./landing")
                        .catch(() => console.err("Failed to sign out"));
        }
    }}>
      {(children)}
    </UserContext.Provider>
  )

}
