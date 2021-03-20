import React from 'react';
import './Vehicle.css';


const Vehicle = (props) => {
    const{type,image} = props.vehicleData;
    // console.log(props.vehicle)
   
   
    return (
        <div className="vehicleStyle">
           
            <img src={image} alt=""></img>
            <h1>{type}</h1>
        </div>
    );
};

export default Vehicle;