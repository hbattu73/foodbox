import React from "react";
import error from "../images/error.svg";

function ErrorHandle() {
    return (
        <div>
            <div id = "handle-location-error">
                <img src={error} className = "handle-error" id = "error"/> 
                <h3 className="handle-error">
                    Error in rendering results
                </h3>
                <h4>
                    <p>Make sure you input your desired location in the Mapbox geolocater <strong>first</strong>.</p> 
                    <p>Refresh the page and try again.</p>
                </h4>
            </div>
        </div>
    );
}

export default ErrorHandle;