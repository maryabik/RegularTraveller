import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../services/UserProvider';
import { Icon, InlineIcon } from '@iconify/react';
import copy24Filled from '@iconify/icons-fluent/copy-24-filled';
import outlineTrain from '@iconify/icons-ic/outline-train';
import TorontoPic from '../../assets/TorontoPic.png';

function Home(){
  const { logout } = useContext(UserContext);

  return (
    <div className="homeContent">
      <h1 className="homeTitle">My Trips</h1>
      <div className="tripItem">
        <img src={TorontoPic} />
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
