import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function AddNewTrip(){

const handleClick = () => window.location.href = "/landing";

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

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.3,
            marginLeft: 20,
            marginRight: 20,
        }}
    />
);

  return (
    <div class="content">
      <h1 style = {{fontSize: '25px', marginLeft: '17px', marginTop: '30px'}}>New Trip Name:</h1>

      <ColoredLine2 color="black" />
      
      <div style = {{marginTop: '30px'}}>
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'black', textAlign:'justify', marginLeft: '50px', marginTop: '8px'}}>
            From: <button class="button3" style= {{ marginLeft: '10px', backgroundColor: 'white', border : '2px solid black',
       padding: '8px 40px', borderRadius: '12px', transitionDuration: '0.1s', textAlign: 'center', fontSize: '15px', width: '230px'}} 
       onClick={handleClick}>
        Current Location
      </button>
        </p>
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'black', textAlign:'justify', marginLeft: '50px', marginTop: '8px'}}>
            To: <button class="button3" style= {{ marginLeft: '30px', backgroundColor: 'white', border : '2px solid black',
       padding: '8px 40px', borderRadius: '12px', transitionDuration: '0.1s', textAlign: 'center', fontSize: '15px',  width: '230px'}} 
       onClick={handleClick}>
        Search Destination
      </button>
        </p>
      </div>
    
      <p style= {{marginLeft: '20px', marginTop: '30px'}}>Departure date:</p>
      <p style= {{marginLeft: '20px'}}>
          To schedule this trip, add a departure date. Leave this blank to save as a template:
      </p>

      <label>
       <button class="button3" style= {{ marginLeft: '30px', backgroundColor: 'white', border : '2px solid black',
       padding: '8px 40px', borderRadius: '12px', transitionDuration: '0.1s', textAlign: 'center', fontSize: '15px',  width: '230px'}}>
           <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="hello"/>
      </button>
      </label>

      <p style= {{marginLeft: '20px', marginTop: '30px'}}>Suggested destinations:</p>
      <p style= {{marginLeft: '20px', marginTop: '1px'}}>Toronto</p>
      <ColoredLine color="rgba(129, 129, 131, 0.863)" />
      <p style= {{marginLeft: '20px', marginTop: '1px'}}>Tokyo</p>
      <ColoredLine color="rgba(129, 129, 131, 0.863)" />
      <p style= {{marginLeft: '20px', marginTop: '1px'}}>Shanghai</p>
      <ColoredLine color="rgba(129, 129, 131, 0.863)" />

      <button class="button button1" style= {{marginTop: '40px', backgroundColor: 'white', border : '2px solid black',
       padding: '10px 35px', borderRadius: '12px', transitionDuration: '0.4s', textAlign: 'center', fontSize: '16px'}} 
       onClick={handleClick}>
        Cancel
      </button>
      <button class="button button2" style= {{ marginLeft: '110px', backgroundColor: 'white', border : '2px solid black',
       padding: '10px 35px', borderRadius: '12px', transitionDuration: '0.4s', textAlign: 'center', fontSize: '16px'}} 
       onClick={handleClick}>
        Save
      </button>
    

    </div>
      
  );
}

export default AddNewTrip;
