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
  const [tripIDs, setTripIDs] = useState([]); // stores tripIDs
  const [tripMap, setTripMap] = useState({}); // map for tripID -> list of segmentIDs
  const [segmentMap, setSegmentMap] = useState({}); // map for segmentID -> list of segment details

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function insertTrip(userID, depart, tripName, start, end) {
    return new Promise((resolve, reject) => {
      const tripID = uuidv4();
      setTripIDs([tripID, ...tripIDs]);

      const tripRef = db.collection("users").doc(userID).collection("trips").doc(tripID);
      tripRef.set({
        departureDate: depart,
        arrivalDate: "",
        tripName: tripName,
        startLocation: start,
        endLocation: end,
        uid: tripID
      }).then((response) => resolve(response))
			.catch((err) => reject(err));
    }).then((response) => {
      return true;
    }, (err) => {
      return false;
    });
  }

  // fills each trip with three segments
  function setTrip(userID, tripID, index) {
    return new Promise((resolve, reject) => {
      if (index == 0) { // Van to Victoria
        setTripSegment(userID, tripID, "drive", ["44 minutes", "Via Trans-Canada Hwy/BC-1 W"], "UBC",
                      "Tsawwassen Ferry Terminal", "2:00 PM", "2:44 PM", "")
        .then(() => setTripSegment(userID, tripID, "ferry", "3:00 PM", "Tsawwassen Ferry Terminal",
                      "Swartz Bay Ferry Terminal", "3:00 PM", "4:35 PM", ""))
        .then(() => setTripSegment(userID, tripID, "drive", ["37 minutes", "Via Patricia Bay Hwy"], "Swartz Bay Ferry Terminal",
                      "Parliament House", "4:45 PM", "5:22 PM", ""))
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      } else if (index == 1) { // Van to LA
        setTripSegment(userID, tripID, "drive", ["16 minutes", "Via SW Marine Drive"], "UBC",
                      "YVR", "11:00 AM", "11:16 AM", "")
        .then(() => setTripSegment(userID, tripID, "flight", ["Air Canada", "554"], "YVR",
                      "LAX", "1:45 PM", "4:28 PM", ""))
        .then(() => setTripSegment(userID, tripID, "drive", ["37 minutes", "Via I-105 E and I-110 N"], "LAX",
                      "Los Angeles City Hall", "5:00 PM", "5:37 PM", ""))
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      } else { // Van to Brasilia
        setTripSegment(userID, tripID, "taxi", ["Yellow Cab", "604-681-1111"], "UBC",
                      "YVR", "10:00 AM", "10:16 AM", "")
        .then(() => setTripSegment(userID, tripID, "flight-layover2", ["Air Canada", "118", "Air Canada", "90", "Air Canada", "9832"],
                      "YVR", "BSB", "2:10 PM", "6:25 PM", ""))
        .then(() => setTripSegment(userID, tripID, "taxi", ["Taxi Brasilia", "55 61 98126-5306"], "BSB",
                      "Pier 21", "7:00 PM", "7:15 PM", ""))
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      }
    })
    .then((response) => {
      console.log("Added all segments to trip");
      return true;
    }, (err) => {
      return false;
    });
  }

  // for prefilled trips: type = {drive, ferry, flight, taxi}
  // drive: [String distance, String Major Street Name]
  // ferry: String sailing time
  // flight: [Airline 1, Flight # 1, Airline 2, ...]
  //        -> flight-layover1 (1 layover), flight-layover2 (2 layovers)
  // taxi: String taxi company phone number
  function setTripSegment(userID, tripID, type, details, start, end, depart, arrive, notes) {
    return new Promise((resolve, reject) => {
      const segmentID = uuidv4();
      const segRef = db.collection("users").doc(userID).collection("trips").doc(tripID)
                       .collection("segments").doc(segmentID);
      var content = {};
      if (type == "drive") {
        content = {
          type: type,
          distance: details[0],
          route: details[1],
          startLocation: start,
          endLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID
        };
      } else if (type == "ferry") {
        content = {
          type: type,
          sailing: details,
          startLocation: start,
          endLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID
        };
      } else if (type == "flight") {
        content = {
          type: type,
          airline: details[0],
          flightNum: details[1],
          startLocation: start,
          endLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID
        };
      } else if (type == "flight-layover1") {
        content = {
          type: type,
          airline1: details[0],
          flightNum1: details[1],
          airline2: details[0],
          flightNum2: details[1],
          startLocation: start,
          endLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID
        };
      } else if (type == "flight-layover2") {
        content = {
          type: type,
          airline1: details[0],
          flightNum1: details[1],
          airline2: details[2],
          flightNum2: details[3],
          airline3: details[4],
          flightNum3: details[5],
          startLocation: start,
          endLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID
        };
      } else { // taxi
        content = {
          type: type,
          company: details[0],
          companyNum: details[1],
          startLocation: start,
          endLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID
        };
      }

      segRef.set(content).then((response) => resolve(response))
        .catch((err) => reject(err))
    })
    .then((response) => {
      console.log("Created trip segment for tripID " + tripID);
      return true;
    }, (err) => {
      return false;
    });
  }

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
              .then(() => {
                console.log("Inserting trips");
                Promise.all([
                  insertTrip(userID, "March 1, 2021", "Trip to Victoria", "Vancouver, BC", "Victoria, BC"),
                  insertTrip(userID, "March 5, 2021", "Trip to LA", "Vancouver, BC", "Los Angeles, California"),
                  insertTrip(userID, "March 10, 2021", "Trip to Brasilia", "Vancouver, BC", "Brasilia, Brazil")
                ]);
              })
              .then(() => {
                console.log("Inserting trip segments");
                Promise.all([
                  setTrip(userID, tripIDs[0], 0),
                  setTrip(userID, tripIDs[1], 1),
                  setTrip(userID, tripIDs[2], 2)
                ]);
              })
              .then(() => window.location.href = "./home");
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