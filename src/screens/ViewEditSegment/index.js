// view and edit segment screen
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './index.css';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

import { ReactComponent as ArrowBack } from '../../assets/arrowBack.svg';
import { ReactComponent as DriveGray } from '../../assets/DriveGray.svg';
import { ReactComponent as FerryGray } from '../../assets/FerryGray.svg';
import { ReactComponent as PlaneGray } from '../../assets/PlaneGray.svg';
import { ReactComponent as TaxiGray } from '../../assets/TaxiGray.svg';
import { ReactComponent as TransitGray } from '../../assets/TransitGray.svg';
import { ReactComponent as DriveBlack } from '../../assets/DriveBlack.svg';
import { ReactComponent as FerryBlack } from '../../assets/FerryBlack.svg';
import { ReactComponent as PlaneBlack } from '../../assets/PlaneBlack.svg';
import { ReactComponent as TaxiBlack } from '../../assets/TaxiBlack.svg';
import { ReactComponent as TransitBlack } from '../../assets/TransitBlack.svg';

function SegmentScreen() {
  const location = useLocation();
  let history = useHistory();
  const userID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  const tripData = {
    tripID: "2aea483d-765e-432e-9abc-02711198d968",
    segmentID: "7f91aed8-a154-4d2c-b871-2caf60d3e8b7",
    startingLocation: "LAX",
    destinationLocation: "Los Angeles City Hall"
  }

  const [start, setStart] = useState("");
  const [dest, setDest] = useState("");
  const [depart, setDepart] = useState("");
  const [icons, setIcons] = useState([false, false, false, false, false]);
  const [allSegments, setAllSegments] = useState([]); // routeData
  const [userSegments, setUserSegments] = useState([]); // all the user's segments
  const [tripSegments, setTripSegments] = useState([]); // all the segments in this trip
  const [thisSegment, setThisSegment] = useState({}); // this current segment

  // flight states
  const [airline, setAirline] = useState("Airline");
  const [flightNum, setFlightNum] = useState("Flight Number");

  useEffect(() => {
    const subscriber = loadData();
    return () => subscriber();
  }, []);

  function loadData() { // get all the data we need
    db.collection('routeData')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setAllSegments((prevSegments) => {
            return [doc.data(), ...prevSegments]; // populate trips array with the user's trips
          });
          //console.log(doc.id, " => ", doc.data());
        });
      });

    db.collection('users').doc(userID).collection('trips')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // for each trip
          db.collection('users').doc(userID).collection('trips').doc(doc.id).collection('segments')
            .get()
            .then((qSnapshot) => {
              qSnapshot.forEach(d => { // for each segment of each user trip
                if (doc.id == tripData.tripID) {
                  setTripSegments((prev) => {
                    return [d.data(), ...prev]; // add segment to current trip
                  });
                }

                setUserSegments((prev) => {
                  return [d.data(), ...prev]; // add segment to list of user segments
                });
                console.log(d.id, " => ", d.data());
              });
            });
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

  function selectTransport(index, start, dest) {
    // make icons[index] the active segment
    switch(index) {
      case 0: // flight
        setIcons([true, false, false, false, false]);
        break;
      case 1: // transit
        setIcons([false, true, false, false, false]);
        break;
      case 2: // taxi
        setIcons([false, false, true, false, false]);
        break;
      case 3: // drive
        setIcons([false, false, false, true, false]);
        break;
      default: // ferry
        setIcons([false, false, false, false, true]);
        break;
    }

  }

  function displayFlightInfo(index, start, dest) {
    // depending on start and dest, search for flights that user has previously taken
    // display that history as a list
    // layovers should be inputted as individual flights
    var prevFlights = userSegments.filter((item) => item.modeOfTransport == "flight" &&
                                                    item.startingLocation == start &&
                                                    item.destinationLocation == dest);

    return (
      <div className="flightSegmentContent">
        <div className="flightSegmentInputRow">
          <p style={{marginRight: 81}}>Airline:</p>
          <form onSubmit={e => { e.preventDefault(); }}>
            <input type="text"
                   placeholder={airline}
                   id="airlineInput"
                   className="segmentInputForm"
                   onChange={(event) => {
                     setAirline(event.target.value);
                     console.log(airline);
                   }}
            />
          </form>
        </div>
        <div className="flightSegmentInputRow">
          <p style={{marginRight: 23}}>Flight Number:</p>
          <form onSubmit={e => { e.preventDefault(); }}>
            <input type="text"
                   placeholder={flightNum}
                   id="flightNumInput"
                   className="segmentInputForm"
                   onChange={(event) => {
                     setFlightNum(event.target.value);
                     console.log(flightNum);
                   }}
            />
          </form>
        </div>
        <p><strong>Your Flight History</strong></p>
        <ul className="segmentFlightHistory">
        {(prevFlights != undefined && prevFlights.length > 0) ?
          prevFlights.map((res) =>
            <div className="segmentFlightElement"
                 onClick={() => {
                   setFlightNum(res.flightNum);
                   setAirline(res.airline);
                   document.getElementById("airlineInput").value = airline;
                   document.getElementById("flightNumInput").value = flightNum;
                 }}>
              <p style={{marginRight: 4}}>{res.flightNum}</p>
              <p style={{marginRight: 30}}>{res.airline}</p>
              <p>{res.startingLocation}</p>
              <p> - </p>
              <p>{res.destinationLocation}</p>
            </div>)
          : <p>No previous flights found</p>}
        </ul>
      </div>
    );
  }

  function displayTransitInfo(index, start, dest) {
    return (
      <div>
        Transit
      </div>
    );
  }

  function displayTaxiInfo(index, start, dest) {
    return (
      <div>
        Taxi
      </div>
    );
  }

  function displayDriveInfo(index, start, dest) {
    return (
      <div>
        Drive
      </div>
    );
  }

  function displayFerryInfo(index, start, dest) {
    return (
      <div>
        Ferry
      </div>
    );
  }

  function saveSegment() {
    const doc = db.collection('users').doc(tripData.tripID)
                  .collection('segments').doc(tripData.segmentID);

    if (start == "" || dest == "" || depart == "") {
      alert("Please fill in depature time, start location and destination location.");
    }

    if (icons[0]) { // flight
        doc.set({

        });
    } else if (icons[1]) { // transit

    } else if (icons[2]) { // taxi

    } else if (icons[3]) { // drive

    } else { // ferry

    }
  }

  return(
    <div className="segmentScreenContent">
      <div className="segmentTitleContainer">
        <ArrowBack onClick={() => window.location.href = "./view-trip"}/>
        <h1 className="segmentScreenTitle">Trip Plan</h1>
      </div>
      <div className="segmentInputFields">
        <div className="segmentInputRow">
          <p style={{marginRight: 60}}>From:</p>
          <form onSubmit={e => { e.preventDefault(); }}>
            <input type="text"
                   placeholder="Start Location"
                   id="startLocation"
                   className="segmentInputForm"
                   onChange={changeStart}
            />
          </form>
        </div>
        <div className="segmentInputRow">
          <p style={{marginRight: 79}}>To:</p>
          <form onSubmit={e => { e.preventDefault(); }}>
            <input type="text"
                   placeholder="Destination Location"
                   id="destLocation"
                   className="segmentInputForm"
                   onChange={changeDest}
            />
          </form>
        </div>
        <div className="segmentInputRow">
          <p style={{marginRight: 23}}>Departure:</p>
          <form onSubmit={e => { e.preventDefault(); }}>
            <input type="text"
                   placeholder="Departure Time"
                   id="departTime"
                   className="segmentInputForm"
                   onChange={changeDest}
            />
          </form>
        </div>
        <div className="segmentIconRow">
          {icons[0] ? <PlaneBlack /> : <PlaneGray onClick={() => selectTransport(0, start, dest)}/>}
          {icons[1] ? <TransitBlack /> : <TransitGray onClick={() => selectTransport(1, start, dest)}/>}
          {icons[2] ? <TaxiBlack /> : <TaxiGray onClick={() => selectTransport(2, start, dest)}/>}
          {icons[3] ? <DriveBlack /> : <DriveGray onClick={() => selectTransport(3, start, dest)}/>}
          {icons[4] ? <FerryBlack /> : <FerryGray onClick={() => selectTransport(4, start, dest)}/>}
        </div>
        <hr className="segmentIconUnderline"/>
        <div className="segmentContent">
          {/* Replaceable Content Goes Here */
            icons[0] ? displayFlightInfo(0, start, dest) :
            icons[1] ? displayTransitInfo(1, start, dest) :
            icons[2] ? displayTaxiInfo(2, start, dest) :
            icons[3] ? displayDriveInfo(3, start, dest) : displayFerryInfo(4, start, dest)
          }
        </div>
        <div className="segmentSaveButton"
             onClick={() => saveSegment()}>
          <p className="segmentSaveText">SAVE</p>
        </div>
      </div>
    </div>
  );
}

export default SegmentScreen;
