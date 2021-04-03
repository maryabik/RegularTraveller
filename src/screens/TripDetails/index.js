import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../services/UserProvider';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./index.css";
import {IoIosSubway, IoIosCar, IoIosBus, IoIosAirplane, IoMdBoat} from "react-icons/io";
import { Icon, InlineIcon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "reactjs-popup/dist/index.css";
import firebase from "firebase/app"
import Segment from "./Segment";

import { ReactComponent as ArrowBack } from '../../assets/arrowBack.svg';

const iconMapping = new Map ([
    ["Drive", <IoIosCar className = "segment-icon"/>],
    ["taxi", <IoIosCar className = "segment-icon"/>],
    ["Flight", <IoIosAirplane className = "segment-icon"/>],
    ["Bus", <IoIosBus className = "segment-icon"/>]
])

function TripDetail() {
  const { logout } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const userID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  // the current trip we are on
  var currTrip = location.state.currTrip;
  console.log(currTrip);

  // list of the current trip's segments
  const [segments, setSegments] = useState([]);

  const [departDate, setDepartDate] = useState(currTrip.departureDate);
  const [start, setStart] = useState(currTrip.startLocation);
  const [dest, setDest] = useState(currTrip.endLocation);

  useEffect(() => {
    fetchTripInfo();
  }, []);

  async function fetchTripInfo() {
      await db.collection("users")
        .doc(userID)
        .collection("trips")
        .doc(currTrip.uid)
        .collection("segments")
        .get()
        .then((collection) => {
          collection.forEach((doc) => {
            setSegments((prev) => {
              return [doc.data(), ...prev];
            });
          });
        });
  }

  function saveTripInfo() {
      const tripRef = db
          .collection("users")
          .doc(this.user)
          .collection("trips")
          .doc(this.tripUID);

      tripRef.set({
          // depatureDate: this.state.departure_date,
          startLocation: this.state.trip_start,
          endLocation: this.state.trip_destination
      });

      history.push("/home");
  }

  function changeDate(event) {
    var target = event.target.value;
    setDepartDate(target);
  }

  function changeStart(event) {
    var target = event.target.value;
    setStart(target);
  }

  function changeDest(event) {
    var target = event.target.value;
    setDest(target);
  }

    return (
        <div className="wrapper">
          <div className="tripScreenTitleContainer">
            <ArrowBack onClick={() => {
              //saveSegment()
              history.push("/home"); }}
            />
          <h1 className="tripScreenTitle">{currTrip.tripName}</h1>
          </div>
          <div className="tripInputRow">
            <p style={{marginRight: 30}}>Departure:</p>
            <form onSubmit={e => { e.preventDefault(); }}>
              <input type="Date"
                     placeholder={departDate}
                     id="departureDate"
                     className="tripInputForm"
                     onChange={changeDate}
              />
            </form>
          </div>
          <div className="tripInputRow">
            <p style={{marginRight: 65}}>From:</p>
            <form onSubmit={e => { e.preventDefault(); }}>
              <input type="text"
                     placeholder={start}
                     id="departureDate"
                     className="tripInputForm"
                     onChange={changeStart}
              />
            </form>
          </div>
          <div className="tripInputRow">
            <p style={{marginRight: 84}}>To:</p>
            <form onSubmit={e => { e.preventDefault(); }}>
              <input type="text"
                     placeholder={dest}
                     id="departureDate"
                     className="tripInputForm"
                     onChange={changeDest}
              />
            </form>
          </div>
          <ul className="tripSegmentList">
            {[].concat(segments)
               .sort((a, b) => a.sequenceNum > b.sequenceNum ? 1 : -1)
               .map((item) => {
                return (<Segment segment={item}
                                 onClick={() => {
                                   history.push("/segment", {
                                     trip: currTrip,
                                     segment: item
                                   });
                                 }}>
                        </Segment>);
            })}
          </ul>
          <div className="addSegmentBtn"
               onClick={() => history.push("/segment", { trip: currTrip })}><p>+</p></div>
        </div>
    );
}

export default TripDetail;
