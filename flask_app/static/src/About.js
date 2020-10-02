import React from "react";

function About() {
    return (
        <div className="About">
            <h3>About</h3>
            <p>
            This app is built with Flask on the backend and harnasses 
            the power of<a href="https://www.yelp.com/fusion"> <b>Yelp Fusion</b></a> for the data retrieval.
            </p>
            <p>
            The frontend is implemented with React and the interactive map was designed 
            using<a href="https://www.mapbox.com/mapbox-studio/"> <b>Mapbox Studio</b></a> and embedded 
            with <a href="https://docs.mapbox.com/mapbox-gl-js/api/"><b>Mapbox GL JS</b>.</a>
            </p>
            <p>To use this app, you must first provide your location in the Mapbox GeoLocater. Then, input a 
            relevant search term and a numeric limit to your results, with an option of sort-by filtering.
            </p>
            <p>The results will be shown in this sidebar with emphasis on the visibility of delivery and 
            pickup options due to the ongoing Covid-19 pandemic.
            </p>
        </div>
    );
}
export default About;