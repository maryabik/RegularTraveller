import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../services/UserProvider';
import calendarIcon from '@iconify/icons-bi/calendar';
import { Icon, InlineIcon } from '@iconify/react';






class Add extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      trip_name: '',
      date: new Date(),
      trip_start: '',
      trip_destination: '',
    };

    this.update_trip_name = this.update_trip_name.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.update_trip_destination = this.update_trip_destination.bind(this);
    this.update_trip_start = this.update_trip_start.bind(this);

  }
  
  // Update the state with the task name given by the user
  async update_trip_name(event) {
    await this.setState({ trip_name: event.target.value});
  }

  async update_trip_destination(event) {
    await this.setState({ trip_destination: event.target.value});
  }

  async update_trip_start(event) {
    await this.setState({ trip_start: event.target.value});
  }

  handleChange = date => {
    this.setState({
      date: date
    });
  };


  ColoredLine2 = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
        }}
    />
  );


render(){
  return (
    <div className="content">
      <div id="cancel"onClick={()=>{window.location.href = "/home"}}>
        <p style={{marginLeft: "10px", color: "#3A72B4"}}>Cancel</p>
      </div>
      <div style ={{margin:'auto', textAlign: 'center'}} id="header">
        <h1>New Trip</h1>
      </div>
      <div id="add-container">
        <p style={{marginLeft: "10px"}}><strong>Trip Name*</strong></p>
        <div className="rectangleAdd">
        <input type="text" placeholder="Enter trip name" onChange={this.update_trip_name} />
        </div>
        <p style={{marginLeft: "10px"}}><strong>Start Location*</strong></p>
        <div className="rectangleAdd">
        <input type="text" placeholder="Enter start location" onChange={this.update_trip_start} />
        </div>
        <p style={{marginLeft: "10px"}}><strong>Destiantion Location*</strong></p>
        <div className="rectangleAdd">
        <input type="text" placeholder="Enter destination location" onChange={this.update_trip_destination} />
        </div>
        <p style={{marginLeft: "10px"}}><strong>Departure Date*</strong></p>
        <div className="rectangleDept">
        <DatePicker selected={this.state.date} onChange={this.handleChange}/>
        </div>
        <Icon icon={calendarIcon} style={{fontSize: '30px'}} ></Icon>
      </div>

      <div>
          <button className="saveButton" onClick={()=>{window.location.href = "/template-details"}}>Save</button>
        </div>
      
    </div>

  );
  }
}

export default Add;
