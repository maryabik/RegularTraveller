import "./index.css"
import {IoIosSubway, IoIosCar, IoIosBus, IoIosAirplane, IoMdBoat} from "react-icons/io";

import { ReactComponent as DriveGray } from '../../assets/DriveGray.svg';
import { ReactComponent as FerryGray } from '../../assets/FerryGray.svg';
import { ReactComponent as PlaneGray } from '../../assets/PlaneGray.svg';
import { ReactComponent as TaxiGray } from '../../assets/TaxiGray.svg';
import { ReactComponent as TransitGray } from '../../assets/TransitGray.svg';

const Segment = ({ segment, onClick}) => {
    var transport = segment.modeOfTransport == "drive" ? "Drive" :
    segment.modeOfTransport == "ferry" ? "Ferry" :
    segment.modeOfTransport == "taxi" ? "Taxi" :
    segment.modeOfTransport == "transit" ? "Transit" : "Flight";

    var description =
    segment.modeOfTransport == "drive" ? segment.mainStreetName + " (" + segment.distance + ")":
    segment.modeOfTransport == "ferry" ? segment.sailingTime  + " Sailing":
    segment.modeOfTransport == "taxi" ? segment.taxiCompany + " (" + segment.taxiCompanyPhoneNumber + ")":
    segment.modeOfTransport == "transit" ? segment.busNumber + " (" + segment.startingStop + " - " + segment.destinationStop + ")":
      segment.airline + " " + segment.flightNum + " (" + segment.startingLocation + " - "
      + segment.destinationLocation + ")";

    return (
        <div style={{width: '90%'}} onClick = {onClick}>
            <div className = "line">
                <div className = "segment">
                    {segment.modeOfTransport == "drive" ? <DriveGray /> :
                     segment.modeOfTransport == "ferry" ? <FerryGray /> :
                     segment.modeOfTransport == "taxi" ? <TaxiGray /> :
                     segment.modeOfTransport == "transit" ? <TransitGray /> : <PlaneGray />}
                    <div className = "segment-detail">
                        {transport} <br/>
                        <label className = "segment-transport">{description}</label>
                    </div>
                </div>
                <label>{segment.departureTime}</label>
            </div>
            <hr className="thin"></hr>
        </div>
    );
}

export default Segment
