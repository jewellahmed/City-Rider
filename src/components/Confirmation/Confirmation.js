import React from 'react';
import { useState } from 'react';
import './Confirmation.css';
import { useParams } from 'react-router-dom'
import vehicleData from '../../data/data.json';
const Confirmation = () => {
    const { ride } = useParams()
    const currentRide = vehicleData.find(vehicle => vehicle.type === ride);
    // console.log(currentRide);
    const [form, setForm] = useState(true);
    const [user, setUser] = useState({

        place: '',
        place1: '',
        event: ''

    })

    const handleSubmit = (e) => {
        


        e.preventDefault();

    }

    const handleBlur = (e) => {
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
        // console.log(newUserInfo);
    }
    return (
        <div className="flexStyle">

            <div className="fromStyle">

            <div>

                <form onClick={handleSubmit}>

                    <h2>Select Place</h2>
                    <br />
                    <h4>From</h4>
                    <input type="text" name="place" onBlur={handleBlur} placeholder="Starting"></input>
                    <br />
                    <h4>To</h4>
                    <input type="text" name="place1" onBlur={handleBlur} placeholder="Destination"></input>
                    <br />
                    <h4>Date</h4>
                    <input type="date" name="event" onBlur={handleBlur} placeholder="Date"></input>
                    <br />
                    <input type="submit" value="Search" ></input>
                </form>
            </div>
            <div>
            <p>From:{user.place} To:{user.place1} <br/>Date: {user.event} </p>
            
            </div>
            <div>
                <img src={currentRide.image} style={{ width: '10rem' }} alt="" />
                <h3>{currentRide.type}</h3>

            </div>
            </div>

            <div className="mapStyle">
                <iframe width="100%" height="420px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=CDA%20Market,%20Pahartali,%20Chittagong+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>



        </div>

    );
};

export default Confirmation;