import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';


function Landing() {
  // javascript code Here
  const handleClick = () => window.location.href = "/add";
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.5,
            marginLeft: 20,
            marginRight: 20,
        }}
    />
);

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
    <div class="content">
      <h1 style = {{fontSize: '25px', marginLeft: '17px', marginTop: '30px'}}>Saved Trips</h1>

      <ColoredLine2 color="black" />
      <button class = 'button1'  style= {{marginLeft: '60px', marginTop: '23px', backgroundColor: 'white', border : '1.5px solid black',
       padding: '10px 30px', transitionDuration: '0.4s', textAlign: 'center', fontSize: '13px'}} onClick={handleClick} >
        Scheduled
      </button>
      <button class= "button2" style= {{marginTop: '10px', backgroundColor: 'white', border : '1.5px solid black',
       padding: '10px 30px', transitionDuration: '0.4s', textAlign: 'center', fontSize: '13px'}} onClick={handleClick}>
        Template
      </button>

      <p style= {{fontSize:'15px', color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '290px', marginTop: '12px'}}>Edit</p>
      
      <div style = {{marginTop: '30px'}}>
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '50px', marginTop: '8px'}}>
            From: <a style = {{color : 'black', marginLeft: '90px'}}>UBC, Vancouver</a>
        </p>
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '50px', marginTop: '8px'}}>
            To: <a style = {{color : 'black', marginLeft: '110px'}}>Home, Toronto</a>
        </p>
        <ColoredLine color="rgba(129, 129, 131, 0.863)" />
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '50px', marginTop: '8px'}}>
            From: <a style = {{color : 'black', marginLeft: '90px'}}>Home, Toronto</a>
        </p>
        <p style={{margin: '0in', lineHeight:'130%',fontSize:'17px', 
          color: 'rgb(37, 26, 194)', textAlign:'justify', marginLeft: '50px', marginTop: '8px'}}>
            To: <a style = {{color : 'black', marginLeft: '110px'}}>UBC, Vancouver</a>
        </p>
      </div>

      <button class="button3" style= {{marginTop: '200px', marginLeft: '130px', backgroundColor: 'white', border : '2px solid black',
       padding: '10px 35px', borderRadius: '12px', transitionDuration: '0.4s', textAlign: 'center', fontSize: '16px'}} 
       onClick={handleClick}>
        Plan a Trip Template
      </button>
      <button class="button4" style= {{marginTop: '10px', marginLeft: '130px', backgroundColor: 'white', border : '2px solid black',
       padding: '10px 35px', borderRadius: '12px', transitionDuration: '0.4s', textAlign: 'center', fontSize: '16px'}} 
       onClick={handleClick}>
        Schedule a New Trip
      </button>
    

    </div>
      
  );
}

export default Landing;
