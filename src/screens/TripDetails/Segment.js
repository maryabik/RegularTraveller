import "./index.css"
import {IoIosSubway, IoIosCar, IoIosBus, IoIosAirplane, IoMdBoat} from "react-icons/io";


const Segment = ({ discrption, transport, time, icon, onClick}) => {
    return (
        <div onClick = {onClick}>
            <div className = "line">
                <div className = "segment">
                    {icon}
                    <div className = "segment-detail">
                        {discrption} <br/>
                        <label className = "segment-transport">{transport}</label> 
                    </div>
                </div>
                <label>{time}</label>
            </div>

            <hr className="thin"></hr>
        </div>
    );
}

export default Segment