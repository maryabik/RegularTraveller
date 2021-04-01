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
  const [trips, setTrips] = useState([]);
  const { logout } = useContext(UserContext);
  const user = firebase.auth().currentUser.uid;
  const db = firebase.firestore();

  // pull trips from db (might have to fix syntax)
  /*
    useEffect(() => {
      const subscriber = db.collection('users')
        .doc(user)
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
      return () => subscriber();
    }, []);
  */

    const location = useLocation();
    let history = useHistory();
  
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
      <div className="tripItem" >
        <img src={TorontoPic} onClick={()=>{window.location.href = "/view-trip"}}/>
        <div className="tripItemContent">
          <p className="tripItemTitle"><strong>Vancouver to Toronto</strong></p>
          <p className="tripItemTitle">Thursday, April 6 2021</p>
          <div className="tripItemIconRow">
            <div className="icom1">
              <Icon icon={outlineTrain} style={{color: '#989898', fontSize: '25px'}}  />
              <Icon icon={copy24Filled} style={{color: '#686868', fontSize: '35px'}} onClick={()=>{window.location.href = "/duplicate"}} />
            </div>
          </div>
        </div>
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
                  <form onSubmit={e => { e.preventDefault(); }}>
                    <input type="text"
                          placeholder="Enter trip name"
                          id="startLocation"
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
                          id="startLocation"
                          className="AddTripForm"
                          onChange={changeDest}
                    />
                  </form> 
                <p><strong>Departure Date*</strong></p>
                <form onSubmit={e => { e.preventDefault(); }}>
                    <input type="Date"     
                          id="startLocation"
                          className="AddTripForm"
                          onChange={changeDate}
                    />
                  </form>
              </div>
              <div>
                  <button className="saveButtonAdd" onClick={()=>{window.location.href = "/view-trip"}}>Save</button>
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
