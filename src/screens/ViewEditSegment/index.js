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
  const user = firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  const [start, setStart] = useState("");
  const [dest, setDest] = useState("");
  const [icons, setIcons] = useState([false, false, false, false, false]);
  const [segments, setSegments] = useState([]);

  /*useEffect(() => {
    const subscriber = db.collection('routeData')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setSegments((prevSegments) => {
            return [doc.data(), ...prevSegments]; // populate trips array with the user's trips
          });
          console.log(doc.id, " => ", doc.data());
        });
      });
    return () => subscriber();
  }, []);*/

  function changeStart(event) {
    var target = event.target.value;
    console.log(target);
    setStart(target);
  }

  function changeDest(event) {
    var target = event.target.value;
    console.log(target);
    setDest(target);
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
                   placeholder="Deprature Time"
                   id="departTime"
                   className="segmentInputForm"
                   onChange={changeDest}
            />
          </form>
        </div>
        <div className="segmentIconRow">
          {icons[0] ? <PlaneBlack /> : <PlaneGray />}
          {icons[1] ? <TransitBlack /> : <TransitGray />}
          {icons[2] ? <TaxiBlack /> : <TaxiGray />}
          {icons[3] ? <DriveBlack /> : <DriveGray />}
          {icons[4] ? <FerryBlack /> : <FerryGray />}
        </div>
        <hr className="segmentIconUnderline"/>
        <div className="segmentContent">
          {/* Replaceable Content Goes Here */}
        </div>
      </div>
    </div>
  );
}

export default SegmentScreen;
 