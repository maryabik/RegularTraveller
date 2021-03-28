import React, {useEffect, useState} from "react";
import "./index.css";
import "./Segment";
import {IoIosSubway, IoIosCar, IoIosBus, IoIosAirplane, IoMdBoat} from "react-icons/io";
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css";
import Segment from "./Segment";


const goToViewTrip = () => window.location.href = "/view-trip";

function Template_Details() {
// javascript code Here

    return (
        <div className="wrapper">
            
            <header className = "line">
                <h1>Template: </h1>
                <input className = "template-name-input" name = "template-name" value = "Template name"/>
            </header>


            <div className = "line">
                <label className = "blue-text">From:</label>
                <input className="from-to-input" name="from" value="UBC, Vancouver"/>
            </div>
            
            <div className = "line">
                <label className = "blue-text">To:</label>
                <input className="from-to-input" name="to" value="Home, Toronto"/>
            </div>

            <div className = "box">

                <text className="schedule-prompt">Schedule a trip from this template by adding a departure or arrival time</text>

                <div className = "line">
                    <label className = "blue-text">Departure</label>
                    <button className onClick = {goToViewTrip}>Schedule</button>
                </div>

                <div className = "line">
                    <label className = "blue-text">Arrival</label>
                    <button onClick = {goToViewTrip}>Schedule</button>
                </div>
            </div>

            <Segment discrption = "UBC - YVR" transport = "Drive" time = "30 minuts" icon = {<IoIosCar/>} onClick = {() => {window.location.href = "/edit-trip"}}></Segment>

            <Segment discrption = "YVR - YYZ" transport = "Flight" time = "3 hours" icon = {<IoIosAirplane/>}></Segment>

            <Segment discrption = "YYZ - Home" transport = "Bus" time = "30 minutes" icon = {<IoIosBus/>}></Segment>

            <Popup trigger={<button>Add to Trip</button>} position="left center">
                <div>
                        
                    <button><IoIosCar style = {{marginRight:"4px"}}/>Drive</button>
                    <button><IoIosAirplane style = {{marginRight:"4px"}}/>Flight</button>
                    <button><IoIosBus style = {{marginRight:"4px",}}/>Bus</button>
                    <button><IoMdBoat style = {{marginRight:"4px",}}/>Ferry</button>


                </div>
            </Popup>
        </div>
    );
}

export default Template_Details;
