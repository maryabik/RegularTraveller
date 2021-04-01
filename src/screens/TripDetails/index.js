import React, {useEffect, useState} from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./index.css";
import {IoIosSubway, IoIosCar, IoIosBus, IoIosAirplane, IoMdBoat} from "react-icons/io";
import { Icon, InlineIcon } from "@iconify/react";
import arrowBackFill from "@iconify/icons-eva/arrow-back-fill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "reactjs-popup/dist/index.css";
import firebase from "firebase/app"
import Segment from "./Segment";

const iconMapping = new Map ([
    ["Drive", <IoIosCar className = "segment-icon"/>],
    ["taxi", <IoIosCar className = "segment-icon"/>],
    ["Flight", <IoIosAirplane className = "segment-icon"/>],
    ["Bus", <IoIosBus className = "segment-icon"/>]
])

const goToViewTrip = () => window.location.href = "/view-trip";



class TripDetail extends React.Component {
// javascript code Here
    
    constructor(props) {
        super(props);
        this.state = {
            trip_name: "",
            departure_date: new Date(),
            trip_start: "",
            trip_destination: "",
        };

        this.user = firebase.auth().currentUser.uid;

        this.segDesctrptions = [];
        this.segTime = [];
        this.segTransport = [];
        this.segUID = [];

        this.db = firebase.firestore();
        this.tripUID = "071a26df-34fd-4371-a708-76d51dde6555";

        this.fetchTripInfo();
    }

    async fetchTripInfo () {
        const segCollection = await this.db
            .collection("users")
            .doc(this.user)
            .collection("trips")
            .doc(this.tripUID)
            .collection("segments")
            .get();
        
        segCollection.forEach((doc) => {
            this.segDesctrptions.push(doc.data().startLocation + " - " + doc.data().endLocation);
            this.segTime.push(doc.data().departureTime + "-" + doc.data().arrivalTime);
            this.segTransport.push(doc.data().type);
            this.segUID.push(doc.id)
        });

        const tripRef = this.db
            .collection("users")
            .doc(this.user)
            .collection("trips")
            .doc(this.tripUID);

        const tripDoc = await tripRef.get();

        this.setState({trip_name: tripDoc.data().tripName});
        this.setState({trip_start: tripDoc.data().startLocation});
        this.setState({trip_destination: tripDoc.data().endLocation});
        // this.setState({departure_date: tripDoc.data().departureDate});   
    }

    saveTripInfo() {
        const tripRef = this.db
            .collection("users")
            .doc(this.user)
            .collection("trips")
            .doc(this.tripUID);

        tripRef.set({
            // depatureDate: this.state.departure_date,
            startLocation: this.state.trip_start,
            endLocation: this.state.trip_destination
        });
    }
        

    render () {
        return (
            <div className="wrapper">
                
                <header className = "header">
                    <Icon icon={arrowBackFill} style={{fontSize: "40px"}} onClick = {() => {window.location.href = "/home";}}/>
                    <h1>{this.state.trip_name}</h1>
                </header>

                <div className = "line">
                    <b>Departure:</b>
                    <DatePicker selected = {this.state.data}/>
                </div>

                <p/>

                <div className = "line">
                    <b>From:</b>
                    <input value = {this.state.trip_start}  onChange = {async (event) =>{this.setState({trip_start: event.target.value}); }}/>
                </div>
                
                <div className = "line">
                    <b>to:</b>
                    <input value = {this.state.trip_destination}  onChange = {async (event) =>{this.setState({trip_destination: event.target.value});}}/>
                </div>

                <p style = {{marginTop: "40px"}}/>

                {this.segDesctrptions.map((item, index) => {
                    return (<Segment discrption = {item} transport = {this.segTransport[index]} time = {this.segTime[index]} icon = {iconMapping.get("Drive")} onClick = {() => {window.location.href = "/segment"}}></Segment>);
                })}

                <Fab color="primary" aria-label="add" >
                    <AddIcon/>
                </Fab>
            </div>
        );
    }
}

export default TripDetail;