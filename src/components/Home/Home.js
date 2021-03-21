import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import vehicleData from '../../data/data.json';
import Vehicle from '../Vahicle/Vehicle';
import './Home.css'




const Home = () => {
    const[vehicles,setVehicles] = useState({});
   
    useEffect(() =>{
        setVehicles(vehicleData[0]);
        // console.log(vehicleData[0]);
 
    },[]);
    
    
    return (
        <div className="homeStyle" >

           { 

           vehicleData.map(vehicleData =><Link to={`/confirmation/from/${vehicleData.type}`}><Vehicle vehicleData={vehicleData}></Vehicle></Link>)

           }
            
           
        </div>
    );
};

export default Home;