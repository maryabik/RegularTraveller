import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../services/UserProvider';
import { Icon, InlineIcon } from '@iconify/react';
import copy24Filled from '@iconify/icons-fluent/copy-24-filled';
import outlineTrain from '@iconify/icons-ic/outline-train';
import TorontoPic from '../../assets/TorontoPic.png';

import calendarIcon from '@iconify/icons-bi/calendar';
import moment from 'moment';
import Popup from "reactjs-popup"





function Home(){

  const { logout } = useContext(UserContext);
 

  const auth = firebase.auth();
  const db = firebase.firestore();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const[prevTrips, setTrips] = useState([]);

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
            console.log(doc.id, " => ", doc.data());
          });
        });
    }
  
    //const [user, setUser] = useState(null);
    const [tripIDs, setTripIDs] = useState([]); // stores tripIDs
    //const [tripMap, setTripMap] = useState({}); // map for tripID -> list of segmentIDs

    function displayPastTrips() {

      return(
        <ul className="TripHistory">
        {(prevTrips != undefined && prevTrips.length > 0) ?
          prevTrips.map((res) =>
          <div className="tripItem" >
            <div className="tripItemContent">
            <div className="PastTrip" onClick={() => {window.location.href = "/view-trip"}}>
              <p className="tripItemTitle"><strong>{res.tripName}</strong></p>
                <p className="tripItemTitle">{res.departureDate}</p>
                <div className="tripItemIconRow">
                  <div className="icom1">
                    <Icon icon={outlineTrain} style={{color: '#989898', fontSize: '25px'}}  />
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
                                    placeholder="Enter trip name"
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
                            {setStart(res.start),
                            setDest(res.dest)}
                          </div>
                          <div>
                          <button className="saveButtonAdd" onClick={()=>{
                            window.location.href = "/home";
                            insertTrip(userID, date, name, start, dest)    
                            }}>Save</button>
                          </div> 
                        </div>
                      )}  
                    </Popup>
                </div>
              </div>
            </div>
            </div>
          </div>
            )
          : <p>No previous trips found</p>}
        </ul>   
        
      )
    }

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

    const location = useLocation();
    let history = useHistory();
    const userID = firebase.auth().currentUser.uid;

  
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [dest, setDest] = useState("");
    const [date, setDate] = useState("");

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
  
    function changeName(event) {
      var target = event.target.value;
      console.log(target);
      setName(target);
    }

    function changeDate(event) {
      var target = event.target.value;
      console.log(target);
      setDate(target);
    }

   
  return (
    <div className="homeContent">
      <h1 className="homeTitle">My Trips</h1>
        {displayPastTrips()}
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
                  <form onSubmit={e => { e.preventDefault(); }}>
                    <input type="text"
                          placeholder="Enter trip name"
                          id="tripName"
                          className="AddTripForm"
                          onChange={changeName}
                    />
                  </form>
                <p><strong>Start Location*</strong></p>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <input type="text"
                          placeholder="Enter start location"
                          id="startLocation"
                          className="AddTripForm"
                          onChange={changeStart}
                    />
                  </form>
                <p><strong>Destiantion Location*</strong></p>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <input type="text"
                          placeholder="Enter destination location"
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
                    window.location.href = "/view-trip";
                    insertTrip(userID, date, name, start, dest)                                                           
                    }}>Save</button>
                </div>  
          </div>           
           )}
        </Popup>
      </div>
      <div className="signoutBtn" onClick={() => logout()}>LOG OUT</div>

      
    </div>
  );
}


export default Home;
