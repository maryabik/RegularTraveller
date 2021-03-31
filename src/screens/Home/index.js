import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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

      <button className="buttonPlus"  onClick={() => window.location.href = "/addnew"}>+</button>
      <div className="signoutBtn" onClick={() => logout()}>LOG OUT</div>

      
    </div>
  );
}


export default Home;
