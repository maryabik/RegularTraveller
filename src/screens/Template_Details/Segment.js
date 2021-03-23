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
                        <text className = "segment-transport">{transport}</text> 
                    </div>
                </div>
                <text>{time}</text>
            </div>

            <hr className="thin"></hr>
        </div>
    );
}

export default Segment