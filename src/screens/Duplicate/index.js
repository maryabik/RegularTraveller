import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../services/UserProvider';
import calendarIcon from '@iconify/icons-bi/calendar';
import { Icon, InlineIcon } from '@iconify/react';
import moment from 'moment';






class Duplicate extends React.Component{

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
    this.create_trip = this.create_trip.bind(this);

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


   // if any fields weren't filled out, reset state to blank and don't submit a task
  create_trip(){
    if (this.state.trip_name == '' || this.state.trip_start == '' || this.state.trip_destination == ''){
      this.setState({trip_start: ''});
      this.setState({trip_destination: ''});
      this.setState({trip_name: ''});
      return
    }

    let year = this.state.date.getFullYear();
    let month = this.state.date.getMonth();
    let day = this.state.date.getDate();

    if(!moment([year, month, day]).isValid()) { // months are 0 indexed in moment datatype
      return;


  }

  //create trip in database
  //ToDO 

  }
  

render(){
  return (
    <div className="content">
      <div id="cancel"onClick={()=>{window.location.href = "/home"}}>
        <p style={{marginLeft: "10px", color: "#3A72B4"}}>Cancel</p>
      </div>
      <div style ={{margin:'auto', textAlign: 'center'}} id="header">
        <h1>Duplicate Trip</h1>
      </div>
      <div id="add-container">
        <p style={{marginLeft: "10px"}}><strong>New Trip Name*</strong></p>
        <div className="rectangleDup">
        <input type="text" placeholder="Enter trip name" onChange={this.update_trip_name} />
        </div>
        <p style={{marginLeft: "10px"}}><strong>Set New Departure Date*</strong></p>
        <div className="rectangleDupDept">
        <DatePicker selected={this.state.date} onChange={this.handleChange}/>
        </div>
        <Icon icon={calendarIcon} style={{fontSize: '30px', display: "inlineBlock"}} ></Icon>
        <p style={{marginLeft: "10px", clear: 'left'}}><strong>Options</strong></p>
        
        <label style={{marginLeft: '10px'}}><input type="radio" name="question-one" value="yes" style={{marginLeft: '10px', fontSize: '15px'}}/><strong>Reverse Trip</strong></label>

      </div>
      <div>
          <button className="saveButtonDup" onClick={()=>{window.location.href = "/template-details"}}>Save</button>
        </div> 
      
    </div>

  );
  }
}

export default Duplicate;
