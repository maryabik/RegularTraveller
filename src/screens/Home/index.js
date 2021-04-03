import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../services/UserProvider';
import { Icon, InlineIcon } from '@iconify/react';
import copy24Filled from '@iconify/icons-fluent/copy-24-filled';

import { ReactComponent as ArrowBack } from '../../assets/arrowBack.svg';
import { ReactComponent as DriveGray } from '../../assets/DriveGray.svg';
import { ReactComponent as FerryGray } from '../../assets/FerryGray.svg';
import { ReactComponent as PlaneGray } from '../../assets/PlaneGray.svg';
import { ReactComponent as TaxiGray } from '../../assets/TaxiGray.svg';
import { ReactComponent as TransitGray } from '../../assets/TransitGray.svg';
import { ReactComponent as CalendarIcon } from '../../assets/CalendarIcon.svg';

import moment from 'moment';
import Popup from "reactjs-popup";

function Home() {
  const { logout } = useContext(UserContext);
  const auth = firebase.auth();
  const userID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  const location = useLocation();
  let history = useHistory();

  const [prevTrips, setTrips] = useState([]);
  const [tripIDs, setTripIDs] = useState([]); // stores tripIDs
  const [tripMap, setTripMap] = useState([]);
  const [createdTrip, setCreatedTrip] = useState({});
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [dest, setDest] = useState("");
  const [date, setDate] = useState("");

  const monthMap = {"01": "January", "02": "February", "03": "March", "04": "April",
                    "05": "May", "06": "June", "07": "July", "08": "August",
                    "09": "September", "10": "October", "11": "November", "12": "December"};

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    db.collection('users')
      .doc(userID)
      .collection('trips')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setTrips((prevTrips) => {
            return [doc.data(), ...prevTrips]; // populate trips array with the user's trips
          });

          const trip_ID = doc.id;
          db.collection('users')
            .doc(userID)
            .collection('trips')
            .doc(trip_ID)
            .collection('segments')
            .get()
            .then((querySnapshot) => {
              var segments = [];
              querySnapshot.forEach((d) => {
                // doc.data() is never undefined for query doc snapshots
                segments.push(d.data());
                console.log(d.id, " => ", d.data());
              });
              setTripMap((prev) => {
                return [{tripID: trip_ID, segmentData: segments}, ...prev];
              });
            });
          console.log(doc.id, " => ", doc.data());
        });
      });
  }

  function changeStart(event) {
    var target = event.target.value;
    setStart(target);
  }

  function changeDest(event) {
    var target = event.target.value;
    setDest(target);
  }

  function changeName(event) {
    var target = event.target.value;
    setName(target);
  }

  function changeDate(event) {
    var target = event.target.value;
    setDate(target);
  }

  function reformatDate(dateString) {
    var dateParts = dateString.split('-');
    console.log("Date parts");
    console.log(dateParts);
    var month = monthMap[dateParts[1]];
    return month + " " + dateParts[2] + ", " + dateParts[0];
  }

  function displayPastTrips() {
    return (
      <ul className="tripHistoryList">
      {(prevTrips != undefined && prevTrips.length > 0) ?
        prevTrips.map((res) =>
        <div className="tripItem" >
          <div className="tripItemContent" onClick={() => {
              history.push("/trip-details", { currTrip: res });
            }}>
            <p className="tripItemTitle"><strong>{res.tripName}</strong></p>
            <p className="tripItemTitle">{reformatDate(res.departureDate)}</p>
            <div className="tripItemIconRow">
              {displayIconRow(res)}
              <Popup trigger={<Icon icon={copy24Filled} style={{color: '#686868', fontSize: '35px'}}/>} modal>
                {close => (
                  <div className="modal">
                    <div id="cancel"onClick={close}>
                      <p style={{marginLeft: "10px", color: "#3A72B4"}}>Cancel</p>
                    </div>
                    <div style ={{margin:'auto', textAlign: 'center'}} id="header">
                      <h1>Duplicate Trip</h1>
                    </div>
                    <div id="add-container">
                      <p style={{marginLeft: "10px"}}><strong>New Trip Name*</strong></p>
                      <form onSubmit={e => { e.preventDefault(); }}>
                        <input type="text"
                              placeholder="Trip name"
                              id="tripName"
                              className="AddTripForm"
                              onChange={changeName}
                        />
                      </form>
                      <p style={{marginLeft: "10px"}}><strong>Set New Departure Date*</strong></p>
                      <form onSubmit={e => { e.preventDefault(); }}>
                        <input type="Date"
                              id="Date"
                              className="AddTripForm"
                              onChange={changeDate}
                        />
                      </form>
                    </div>
                    <div>
                    <button className="saveButtonAdd" onClick={()=>{
                      const newTripID = uuidv4();
                      duplicateTrip(res, newTripID)
                      .then(() => duplicateSegments(res, newTripID))
                      .then(() => history.push("/home"));
                      }}>Save</button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </div>
          )
        : <p>No previous trips found</p>}
      </ul>
    );
  }

  function duplicateTrip(trip, newTripID) {
    // duplicate an existing trip in the db, with a new name and start date
    const thisTripID = trip.uid;
    var result = tripMap.filter(elem => {
      return elem.tripID === thisTripID;
    });

    var newTrip = trip;
    if (name == "") {
      alert("Please enter a trip name");
      return;
    } else if (date == "") {
      alert("Please enter a trip date");
      return;
    }
    newTrip.tripName = name;
    newTrip.departureDate = date;

    return new Promise((resolve, reject) => {
      db.collection('users')
        .doc(userID)
        .collection('trips')
        .doc(newTripID)
        .set(newTrip) // create trip
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    })
    .then((response) => {
      return true;
    }, (err) => {
      return false;
    });
  }

  function duplicateSegments(trip, newTripID) {
    var result = tripMap.filter(elem => {
      return elem.tripID === trip.uid;
    });
    var segments = result[0].segmentData;
    var numSegments = segments.length;

    console.log("In duplicate segments");
    console.log(segments);
    return new Promise((resolve, reject) => {
      if (numSegments == 0) {
        resolve();
      } else if (numSegments == 1) {
        copySegment(segments[0], newTripID, uuidv4())
        .then((res) => resolve(res))
        .catch((err) => reject(err));
      } else if (numSegments == 2) {
        copySegment(segments[0], newTripID, uuidv4())
        .then(() => copySegment(segments[1], newTripID, uuidv4()))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
      } else if (numSegments == 3) {
        copySegment(segments[0], newTripID, uuidv4())
        .then(() => copySegment(segments[1], newTripID, uuidv4()))
        .then(() => copySegment(segments[2], newTripID, uuidv4()))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
      } else if (numSegments == 4) {
        copySegment(segments[0], newTripID, uuidv4())
        .then(() => copySegment(segments[1], newTripID, uuidv4()))
        .then(() => copySegment(segments[2], newTripID, uuidv4()))
        .then(() => copySegment(segments[3], newTripID, uuidv4()))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
      } else if (numSegments == 5) {
        copySegment(segments[0], newTripID, uuidv4())
        .then(() => copySegment(segments[1], newTripID, uuidv4()))
        .then(() => copySegment(segments[2], newTripID, uuidv4()))
        .then(() => copySegment(segments[3], newTripID, uuidv4()))
        .then(() => copySegment(segments[4], newTripID, uuidv4()))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
      } else if (numSegments == 6) {
        copySegment(segments[0], newTripID, uuidv4())
        .then(() => copySegment(segments[1], newTripID, uuidv4()))
        .then(() => copySegment(segments[2], newTripID, uuidv4()))
        .then(() => copySegment(segments[3], newTripID, uuidv4()))
        .then(() => copySegment(segments[4], newTripID, uuidv4()))
        .then(() => copySegment(segments[5], newTripID, uuidv4()))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
      }
    }).then((response) => {
      return true;
    }, (err) => {
      return false;
    });

  }

  function copySegment(segmentData, newTripID, segmentID) {
    segmentData.uid = segmentID;
    return new Promise((resolve, reject) => {
      db.collection('users')
        .doc(userID)
        .collection('trips')
        .doc(newTripID)
        .collection('segments')
        .doc(segmentID)
        .set(segmentData)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }).then((response) => {
      return true;
    }, (err) => {
      return false;
    });
  }

  function displayIconRow(trip) {
    var result = tripMap.filter(elem => {
      return elem.tripID === trip.uid;
    });

    var segments = result[0] ? result[0].segmentData : [];
    if (segments != []) {
      segments.sort((a, b) => { return a.sequenceNum - b.sequenceNum; });
    }

    return (
      <ul className="tripSegmentIconRow">
      {(segments != undefined && segments.length > 0) ?
        segments.map((res) =>
        displayIcon(res.modeOfTransport)
      ) : <div></div>}
      </ul>
    );
  }

  function displayIcon(mode) {
    switch(mode) {
      case "flight":
        return ( <PlaneGray /> );
      case "drive":
        return ( <DriveGray /> );
      case "transit":
        return ( <TransitGray /> );
      case "taxi":
        return ( <TaxiGray /> );
      default:
        return ( <FerryGray /> );
    }
  }

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function insertTrip() {
    var tripID = uuidv4();
    var tripContent = {
      departureDate: date,
      arrivalDate: "",
      tripName: name,
      startLocation: start,
      endLocation: dest,
      uid: tripID
    };
    console.log(tripContent);
    setCreatedTrip(tripContent);

    return new Promise((resolve, reject) => {
      var tripRef = db.collection('users').doc(userID).collection('trips').doc(tripID);
      tripRef.set(tripContent)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
      }).then((response) => {
        return true;
      }, (err) => {
        return false;
      });
  }

  return (
    <div className="homeContent">
      <h1 className="homeTitle">My Trips</h1>
      <div className="tripListContainer">
        {displayPastTrips()}
      </div>
      <div className= "modalWrapper">
        <Popup trigger={<button className="buttonPlus">+</button>} modal>
          {close => (
              <div className="modal">
                <div id="cancel"onClick={close}>
                  <p style={{marginLeft: "10px", color: "#3A72B4"}}>Cancel</p>
                </div>
                <div style ={{margin:'auto', textAlign: 'center'}} id="header">
                  <h1>New Trip</h1>
                </div>
                <div id="addcontainer">
                  <p><strong>Trip Name*</strong></p>
                    <form onSubmit={e => { e.preventDefault();}}>
                      <input type="text"
                            placeholder="Trip name"
                            id="tripName"
                            className="AddTripForm"
                            onChange={changeName}
                      />
                    </form>
                  <p><strong>Start Location*</strong></p>
                  <form onSubmit={e => { e.preventDefault(); }}>
                      <input type="text"
                            placeholder="Start location"
                            id="startLocation"
                            className="AddTripForm"
                            onChange={changeStart}
                      />
                    </form>
                  <p><strong>Destination Location*</strong></p>
                  <form onSubmit={e => { e.preventDefault(); }}>
                      <input type="text"
                            placeholder="Destination location"
                            id="DestLocation"
                            className="AddTripForm"
                            onChange={changeDest}
                      />
                    </form>
                  <p><strong>Departure Date*</strong></p>
                  <form onSubmit={e => { e.preventDefault(); }}>
                      <input type="Date"
                            id="Date"
                            className="AddTripForm"
                            onChange={changeDate}
                      />
                    </form>
                </div>
                <div>
                    <button className="saveButtonAdd" onClick={()=>{
                      insertTrip().then(() => history.push("/trip-details", { currTrip: createdTrip }));
                      }}>Save</button>
                  </div>
            </div>
             )}
          </Popup>
        </div>
      <div className="signoutBtn" onClick={() => logout()}><strong>LOG OUT</strong></div>
    </div>
  );
}

export default Home;
