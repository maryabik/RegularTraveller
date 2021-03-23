//import React, { useEffect, useState } from 'react';
import './index.css';
import backarrow from './backArrow.gif';
import {IoIosSubway, IoIosCar, IoIosBus, IoIosAirplane} from 'react-icons/io';

function View_trip() {
  // javascript code Here
  const handleModify = () => window.location.href = "/edit-trip";
  const handleBack = () => window.location.href = "/landing";

  return (
    <div className="wrapper">

      <div className="headbar">
        <a href="/landing"><img src={backarrow} alt="back" width="24" height="24"/></a>
        <label>
          <b style = {{color : 'black', marginLeft: '20px', marginRight: '20px'}}>Trip</b>
          <input name="tripName" value="trip name"/>
        </label>  
      </div>

      <hr className="head"/>

      <div className="locations">
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '0px', marginTop: '0px'}}>
            From: <a style = {{color : 'black', marginLeft: '90px'}}>UBC, Vancouver</a>
        </p>
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '0px', marginTop: '0px'}}>
            To: <a style = {{color : 'black', marginLeft: '110px'}}>Home, Toronto</a>
        </p>
      </div>
      
      <hr/>

      <div className="times">
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'12px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '0px', marginTop: '0px'}}>
            Depatrure: <a style = {{marginLeft: '50px'}}>March 14, 2021  10:00 (PST)</a>
        </p>
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'12px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '0px', marginTop: '0px'}}>
            Arrival: <a style = {{marginLeft: '70px'}}>March 14, 2021  10:00 (PST)</a>
        </p>
      </div>

      <hr/>

      <div className="tripSegment">
        <p onClick={handleModify}>
          <IoIosCar/>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'14px', marginLeft: '20px', marginTop: '0px'}}>UBC - YVR</span>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'10px', marginLeft: '100px', marginTop: '0px'}}>10:00-10:20</span>
          <br/>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'12px', marginLeft: '40px', marginTop: '0px'}}>Drive</span>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'10px', marginLeft: '160px', marginTop: '0px'}}>(PST)</span>
        </p>
      </div>

      <hr className="thin"></hr>
      
      <div className="tripSegment">
        <p onClick={handleModify}>
          <IoIosAirplane/>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'14px', marginLeft: '20px', marginTop: '0px'}}>YVR - YYZ</span>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'10px', marginLeft: '104px', marginTop: '0px'}}>10:30 (PST)</span>
          <br/>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'12px', marginLeft: '40px', marginTop: '0px'}}>AC002</span>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'10px', marginLeft: '120px', marginTop: '0px'}}>- 21:00 (EST)</span>
        </p>
      </div>

      <hr className="thin"></hr>
      
      <div className="tripSegment">
        <p onClick={handleModify}>
          <IoIosBus/>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'14px', marginLeft: '20px', marginTop: '0px'}}>YYZ - Home</span>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'10px', marginLeft: '90px', marginTop: '0px'}}>22:00-22:30</span>
          <br/>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'12px', marginLeft: '40px', marginTop: '0px'}}>Bus</span>
          <span style={{margin: '0in', lineHeight:'100%',fontSize:'10px', marginLeft: '170px', marginTop: '0px'}}>(EST)</span>
        </p>
      </div>

      <div className="bottombar">
      <button style= {{ marginLeft: '90px', marginTop: '40px',textAlign: 'center', fontSize: '16px'}} 
        onClick={handleBack}>Add to trip</button>

        <button  style= {{ marginLeft: '0px', marginTop: '40px',textAlign: 'center', fontSize: '16px'}}
        onClick={handleBack}>Back</button>
      </div>
      

    </div>
  );
}

export default View_trip;
