import React, {useState, createContext} from "react";
import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import { signInWithGoogle } from './firebase.js';
import { useHistory, useLocation } from 'react-router-dom';

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const UserContext = createContext({});
export const UserProvider = ({ children }) => {
  let history = useHistory();
  const [user, setUser] = useState(null);
  const [tripIDs, setTripIDs] = useState([]); // stores tripIDs
  const [tripMap, setTripMap] = useState({}); // map for tripID -> list of segmentIDs

  // currently selected trip
  const [currTrip, setCurrTrip] = useState({});

  // current selected segment
  const [currSegment, setCurrSegment] = useState({});

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function insertTrip(userID, depart, tripName, start, end) {
    return new Promise((resolve, reject) => {
      var tripID = uuidv4();
      var copy = tripIDs;
      copy.push(tripID);
      setTripIDs(copy);
      console.log(tripIDs);

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
        setTripSegment(userID, tripID, "drive", ["31.9 km", "Via Trans-Canada Hwy/BC-1 W"], "UBC",
                      "Horseshoe Bay Ferry Terminal", "2:00 PM", "2:44 PM", "", 1)
        .then(() => setTripSegment(userID, tripID, "ferry", "3:00 PM", "Horseshoe Ferry Terminal",
                      "Swartz Bay Ferry Terminal", "3:00 PM", "4:35 PM", "", 2))
        .then(() => setTripSegment(userID, tripID, "drive", ["32.6 km", "Via Patricia Bay Hwy"], "Swartz Bay Ferry Terminal",
                      "Parliament House", "4:45 PM", "5:22 PM", "", 3))
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      } else if (index == 1) { // Van to LA
        setTripSegment(userID, tripID, "drive", ["13.2 km", "Via SW Marine Drive"], "UBC",
                      "YVR", "11:00 AM", "11:16 AM", "", 1)
        .then(() => setTripSegment(userID, tripID, "flight", ["Air Canada", "AC554"], "YVR",
                      "LAX", "1:45 PM", "4:28 PM", "", 2))
        .then(() => setTripSegment(userID, tripID, "drive", ["18.9 miles", "Via I-105 E and I-110 N"], "LAX",
                      "Los Angeles City Hall", "5:00 PM", "5:37 PM", "", 3))
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      } else { // Van to Brasilia
        setTripSegment(userID, tripID, "taxi", ["Yellow Cab", "604-681-1111"], "UBC",
                      "YVR", "10:00 AM", "10:16 AM", "", 1)
        .then(() => setTripSegment(userID, tripID, "flight", ["Air Canada", "AC118"],
                      "YVR", "YYZ", "2:10 PM", "9:31 PM", "", 2))
        .then(() => setTripSegment(userID, tripID, "flight", ["Air Canada", "AC90"],
                      "YYZ", "GRU", "11:55 PM", "11:50 AM", "", 3))
        .then(() => setTripSegment(userID, tripID, "flight", ["Air Canada", "AC9832"],
                      "GRU", "BSB", "4:35 PM", "6:25 PM", "", 4))
        .then(() => setTripSegment(userID, tripID, "taxi", ["Taxi Brasilia", "55 61 98126-5306"], "BSB",
                      "Pier 21", "7:00 PM", "7:15 PM", "", 5))
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
  function setTripSegment(userID, tripID, type, details, start, end, depart, arrive, notes, order) {
    return new Promise((resolve, reject) => {
      const segmentID = uuidv4();
      const segments = tripMap[tripID]; // [] of segmentIDs
      if (segments != undefined) {
        // a segment already exists in the trip
        segments.push(segmentID);
        setTripMap((prevMap) => {
          return { tripID: segments, ...prevMap };
        });
      } else {
        // a segment does not exist in the trip
        setTripMap((prevMap) => {
          return { tripID: [segmentID], ...prevMap };
        });
      }

      const segRef = db.collection("users").doc(userID).collection("trips").doc(tripID)
                       .collection("segments").doc(segmentID);

      if (type == "drive") {
        segRef.set({
          modeOfTransport: type,
          distance: details[0],
          mainStreetName: details[1],
          startingLocation: start,
          destinationLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID,
          sequenceNum: order
        }).then((response) => resolve(response))
          .catch((err) => reject(err));

      } else if (type == "ferry") {
        segRef.set({
          modeOfTransport: type,
          sailingTime: details,
          startingLocation: start,
          destinationLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID,
          sequenceNum: order
        }).then((response) => resolve(response))
          .catch((err) => reject(err));

      } else if (type == "flight") {
        segRef.set({
          modeOfTransport: type,
          airline: details[0],
          flightNum: details[1],
          startingLocation: start,
          destinationLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID,
          sequenceNum: order
        }).then((response) => resolve(response))
          .catch((err) => reject(err));
      } else { // taxi
        segRef.set({
          modeOfTransport: type,
          taxiCompany: details[0],
          taxiCompanyPhoneNumber: details[1],
          startingLocation: start,
          destinationLocation: end,
          departureTime: depart,
          arrivalTime: arrive,
          notes: "",
          uid: segmentID,
          sequenceNum: order
        }).then((response) => resolve(response))
          .catch((err) => reject(err))

      }
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
        currTrip, setCurrTrip,
        currSegment, setCurrSegment,
        login: () => {
          auth.signInWithPopup(googleProvider).then((res) => {
            console.log(res.user)
            const userID = res.user.uid;
            const userRef = db.collection("users").doc(userID);
            userRef.get()
              .then((docSnapshot) => {
                if (docSnapshot.exists) {
                  window.location.href = "/home"
                } else {
                  userRef.set({ userID: userID, email: res.user.email })
                  .then(() => insertTrip(userID, "2021-03-10", "Trip to Victoria", "Vancouver, BC", "Victoria, BC"))
                  .then(() => insertTrip(userID, "2021-03-20", "Trip to LA", "Vancouver, BC", "Los Angeles, California"))
                  .then(() => insertTrip(userID, "2021-03-23", "Trip to Brasilia", "Vancouver, BC", "Brasilia, Brazil"))
                  .then(() => setTrip(userID, tripIDs[0], 0))
                  .then(() => setTrip(userID, tripIDs[1], 1))
                  .then(() => setTrip(userID, tripIDs[2], 2))
                  .then(() => window.location.href = "/home");
                }
              });
          }).catch((error) => {
            console.log(error.message)
          })
        },
        logout: () => {
          auth.signOut().then(() => window.location.href = "/")
                        .catch(() => console.err("Failed to sign out"));
        }
    }}>
      {(children)}
    </UserContext.Provider>
  )

}
