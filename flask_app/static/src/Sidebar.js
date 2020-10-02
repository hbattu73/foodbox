import React from "react";
import request from "superagent";
import Search from "./Search";
import ErrorHandle from "./ErrorHandle.js";
import Results from "./Results.js"
import Business from "./Business";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            term : "",
            location : "",
            sortBy : null,
            limit : null,
            firstLoad  : true,
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }

    componentDidMount() {
        this.props.geocoder.on('result', function(ev) {
            var built_address = ev.result.place_name
            this.setState ({
                location: built_address
            })
            console.log(this.state.location)
        }.bind(this));
    }

    isEmpty(string) {
        return (!string || 0 === string.length);
    }

    markers(results) {
        const markers = [];
        results.businesses.forEach(function(b){
            markers.push({
              location: b.coordinates,
              name: b.name,
              rating: b.rating,
              isOpen:b.hours[0].is_open_now,        //not all businesses have the 'hours' attribute causing markers to not be shown
              address: b.location.address1 || '',
            })
        });
        return markers;
    }

    geoJSON(markers) {
        const features = markers.map(function(m) {
            return {
              type: 'Feature',
              properties: {
                title: m.name,
                rating: m.rating,
                isOpen: m.isOpen,
                address: m.address
              },
              geometry: {
                coordinates : [
                  m.location.longitude,
                  m.location.latitude
                ],
                type: 'Point'
              }
            }
        });
        const geoJSON = {
            features: features,
            type: 'FeatureCollection'
        };
        return geoJSON;
    }

    search() {
        request.get('/search')
        .query({term: this.state.term})
        .query({limit: this.state.limit})
        .query({location: this.state.location})
        .query({sort_by: this.state.sortBy.value})
        .end((error, response) => {
            if (!error && response) {
                this.setState({
                    results: response.body,
                    firstLoad: false
                });
            }
            else {
                console.log('There was an error fetching from Yelp Fusion', error);
                }
                console.log(this.state.results);
                this.plot();
            }
        );
    }

    highlight(address) {
        const map = this.props.map;
        const results = this.state.results;
        const markers = this.markers(results);

        var highlighted, regular, geoJSON, highlightgeoJSON;
        highlighted = markers.filter(function(m) {
            return m.address.localeCompare(address) == 0
        })
        regular = markers.filter(function(m) {
            return m.address.localeCompare(address) != 0
        })
        
        geoJSON = this.geoJSON(regular);
        highlightgeoJSON = this.geoJSON(highlighted);

        if (map.getLayer('points-viz')) {
            map.removeLayer('points-viz');
        }

        if (map.getSource('points')) {
            map.removeSource('points');
        }

        if (map.getLayer("point-highlight-viz")) {
            map.removeLayer("point-highlight-viz");
        }
        if (map.getSource("point-highlight")) {
            map.removeSource("point-highlight");
        }

        map.addSource('points', {
            'type' : 'geojson',
            'data' : geoJSON
        });
        map.addLayer({
            'id' : 'points-viz',
            'type' : 'circle',
            'source' : 'points',
            'interactive' : true,
            'paint' : {
                'circle-radius' : 8,
                'circle-color' : 'rgb(39, 96, 161)'
            }
        });
        map.addSource('point-highlight', {
            'type' : 'geojson',
            'data' : highlightgeoJSON
        });
        map.addLayer({
            'id' : 'point-highlight-viz',
            'type' : 'circle',
            'source' : 'point-highlight',
            'interactive' : true,
            'paint' : {
                'circle-radius' : 12,
                'circle-color' : 'rgb(245, 66, 93)'
            }
        });
    }

    plot() {
        const map = this.props.map;
        const results = this.state.results;
        const markers = this.markers(results);

        var geoJSON = this.geoJSON(markers);

        if (map.getLayer('points-viz')) {
            map.removeLayer('points-viz');
        }

        if (map.getSource('points')) {
            map.removeSource('points');
        }

        if (map.getLayer("point-highlight-viz")) {
            map.removeLayer("point-highlight-viz");
        }
        if (map.getSource("point-highlight")) {
            map.removeSource("point-highlight");
        }

        map.addSource('points', {
            'type' : 'geojson',
            'data' : geoJSON
        });
        map.addLayer({
            'id' : 'points-viz',
            'type' : 'circle',
            'source' : 'points',
            'interactive' : true,
            'paint' : {
                'circle-radius' : 8,
                'circle-color' : 'rgb(39, 96, 161)'
            }
        });
    }

    handleSubmit(event) {
        alert('Submitted query');
        event.preventDefault();
        this.search();
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    handleSelectChange(value) {
        this.setState({
            sortBy : value
        })
    }
    handleHover(address) {
        this.highlight(address);
    }



    render() {
        if (this.state.firstLoad) {
            return (
                <Search term = {this.state.term}
                        sortBy = {this.state.sortBy}
                        limit = {this.state.limit}
                        handleSelectChange = {this.handleSelectChange}
                        handleChange = {this.handleChange}
                        handleSubmit = {this.handleSubmit}
                />
            );
        }
        const location = this.state.location;
        if (this.isEmpty(location)) {
            return (
                <ErrorHandle/>
            );
        }
        const locations = this.state.results.locations;
        const displayTerm = `"${this.state.term}"`;
        const businesses = this.state.results.businesses;
        const list = businesses.map((b) => (
            <Business name = {b.name} 
                      categories = {b.categories} 
                      rating = {b.rating} 
                      transactions = {b.transactions}
                      address = {b.location.address1}
                      image_url = {b.image_url}
                      page_url = {b.url}
                      handleHover = {this.handleHover}  
            />
          ));
        return(
            <Results term = {this.state.term}
                     sortBy = {this.state.sortBy}
                     limit = {this.state.limit}
                     handleSelectChange = {this.handleSelectChange}
                     handleChange = {this.handleChange}
                     handleSubmit = {this.handleSubmit}
                     locations = {locations}
                     displayTerm = {displayTerm}
                     list = {list}
                     />
        );
    }
}
export default Sidebar;