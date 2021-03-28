import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../services/UserProvider';
import { Icon, InlineIcon } from '@iconify/react';
import copy24Filled from '@iconify/icons-fluent/copy-24-filled';
import outlineTrain from '@iconify/icons-ic/outline-train';







function Home(){
  const { logout } = useContext(UserContext);

  return (
    <div className="content">
      <div id="header">
        <h1>My Trips</h1>
      </div>
      <div id="home-container">
       <div className="rectangle">
         <div className="rectangleHeader">
           <p><strong>Vancouver to Toronto</strong></p>
           Thursday, April 6 2021
         </div>
        <div className="rectangleContainer">
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
