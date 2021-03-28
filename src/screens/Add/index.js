import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../services/UserProvider';
import calendarIcon from '@iconify/icons-bi/calendar';
import { Icon, InlineIcon } from '@iconify/react';






function Add(){
 
  const handleClick = () => window.location.href = "/home";

  const [startDate, setStartDate] = useState(new Date());

  const ColoredLine2 = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
        }}
    />
  );



  return (
    <div className="content">
      <div id="cancel" onClick={handleClick}>
        <p style={{marginLeft: "10px", color: "#3A72B4"}}>Cancel</p>
      </div>
      <div id="header">
        <h1>New Trip</h1>
      </div>
      <div id="add-container">
        <p style={{marginLeft: "10px"}}><strong>Trip Name*</strong></p>
        <div className="rectangleAdd"></div>
        <p style={{marginLeft: "10px"}}><strong>Start Location*</strong></p>
        <div className="rectangleAdd"></div>
        <p style={{marginLeft: "10px"}}><strong>Destiantion Location*</strong></p>
        <div className="rectangleAdd"></div>
        <p style={{marginLeft: "10px"}}><strong>Departure Date*</strong></p>
        <div className="rectangleDept">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)}/>
        </div>
        <Icon icon={calendarIcon} style={{fontSize: '30px'}} ></Icon>
      </div>

      <div>
          <button className="saveButton" onClick={()=>{window.location.href = "/template-details"}}>Save</button>
        </div>
      
    </div>

  );
}

export default Add;
