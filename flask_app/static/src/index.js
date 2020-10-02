import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Sidebar";
  
mapboxgl.accessToken = 'pk.eyJ1IjoiaGJhdHR1IiwiYSI6ImNrZm8yaWs5YjBhaWgycW8wMjd5eGhqaHEifQ.O7YaoZUT7t9-Q115iLVWCg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hbattu/ckfpewvn50baz19q78z9hsadq',
    center: [-122.44, 37.77],
    zoom: 12,
})

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});
    map.addControl(geocoder);

var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');


ReactDOM.render(<Sidebar map = {map} geocoder ={geocoder}/>, document.getElementById('sidebar'));

function isOpen(bool) {
    if (bool) {
        return 'Open now';
    }
    return 'Closed'
}


var popup = new mapboxgl.Popup({
    closeButton: false
});

map.on('mousemove', 'points-viz', function(e) {
    map.getCanvas().style.cursor = 'pointer';
    var feature = e.features[0];
    popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<div class="marker-name">' 
                    + feature.properties.title + '</div>' 
                    + '<p>'+feature.properties.address + '</p>' 
                    + '<p>'+ isOpen(feature.properties.isOpen) + '</p>')
        .addTo(map);
});

map.on('mouseleave', 'points-viz', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });

map.on('mousemove', 'point-highlight-viz', function(e) {
    map.getCanvas().style.cursor = 'pointer';
    var feature = e.features[0];
    popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<div class="marker-name">' 
                    + feature.properties.title + '</div>' 
                    + '<p>'+feature.properties.address + '</p>' 
                    + '<p>'+ isOpen(feature.properties.isOpen) + '</p>')
        .addTo(map);
});

map.on('mouseleave', 'point-highlight-viz', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });



