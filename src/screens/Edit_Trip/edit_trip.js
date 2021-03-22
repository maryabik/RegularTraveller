import React, {useEffect, useState} from 'react';
import './edit_trip.css';
import {IoIosSubway, IoIosCar, IoIosBus, IoIosAirplane} from 'react-icons/io';
import {GrMapLocation} from "react-icons/gr";


function Edit_Trip() {
// javascript code Here

    return (
        <div className="wrapper">
            <h1>Edit Your Trip</h1>
            <fieldset className="direction">

                    <label className="from">
                        <p className="from-to" >From:</p>
                        <div>
                        <input className="from-to-input" name="from" value="UBC, Vancouver"/>
                        </div>
                    </label>

                    <label className="to">
                        <p className="from-to">To:</p>
                        <div>
                        <input className="from-to-input" name="to" value="YVR, Vancouver"/>
                        </div>
                    </label>

            </fieldset>
            <fieldset className="transport">
                <h3 className="transport-selected"><IoIosSubway/></h3>
                <h3 className="transport-icon"><IoIosCar/></h3>
                <h3 className="transport-icon"><IoIosBus/></h3>
                <h3 className="transport-icon"><IoIosAirplane/></h3>

            </fieldset>
                <div>
                    <h3 className="map"><GrMapLocation/></h3>
                    <h2>Route 1</h2>
                    <p>23 min (13km) - <span className="map-route">Via Airport Rd</span></p>

                </div>
                <hr className="thin"></hr>
                <div>
                    <h3 className="map"><GrMapLocation/></h3>
                    <h2>Route 2</h2>
                    <p>24 min (13km) - <span className="map-route">Via Airport Rd</span></p>
                </div>

                <hr className="thin"></hr>

            <button type="save">Save</button>
        </div>
    );
}

export default Edit_Trip;
