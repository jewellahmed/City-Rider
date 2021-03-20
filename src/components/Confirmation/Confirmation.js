import React from 'react';
import './Confirmation.css'

const Confirmation = () => {

    const handleBlur = (e) => {

        console.log(e);

    }

    return (
        <div className="fromStyle">
            <form>
                <h2>Select Place</h2>
                <br />
                <h4>From</h4>
                <input type="text" name="place" onBlur={handleBlur} id="search" placeholder="Starting"></input>
                <br />
                <h4>To</h4>
                <input type="text" name="place" onBlur={handleBlur} id="search2" placeholder="Destination"></input>
                <br />
                <input type="submit" value="Search" ></input>
            </form>
        </div>
    );
};

export default Confirmation;