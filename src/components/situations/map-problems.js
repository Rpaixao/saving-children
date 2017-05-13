import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

import { getTotalChildrenByCountry } from '../../actions/index'

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const GettingStartedGoogleMap = withGoogleMap(props => (

    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={2}
        defaultCenter={{ lat: 0, lng: 0 }}
        onClick={props.onMapClick}
    >
        {
            props.markers.map(marker => (
            <Marker key={marker[0]}
                defaultAnimation = {2}
                onClick={() => alert(marker[0] + ' clicked')}
                title = {marker[4]}
                position = {{
                    lat: marker[1],
                    lng: marker[2]}
                }
            />

        ))}
    </GoogleMap>
));

class MapProblems extends Component {

    componentWillMount() {
        this.props.getTotalChildrenByCountry();
    }

    state = {
        markers: [
            {
                position: {
                    lat: 7.946527,
                    lng: -1.0231939999999895,
                },
                key: `Ghana`,
                defaultAnimation: 2,
            },
            {
                position: {
                    lat: 40.741895,
                    lng: -73.989308,
                },
                key: `Ethiopia`,
                defaultAnimation: 1,
            }
        ],
    };

    handleMapLoad = this.handleMapLoad.bind(this);
    handleMapClick = this.handleMapClick.bind(this);
    handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

    handleMapLoad(map) {
        this._mapComponent = map;
        //if (map) {
        //    console.log(map.getZoom());
        //}
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
        ];
        this.setState({
            markers: nextMarkers,
        });

        if (nextMarkers.length === 3) {
            this.props.toast(
                `Right click on the marker to remove it`,
                `Also check the code!`
            );
        }
    }

    handleMarkerRightClick(targetMarker) {
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }

    render() {

        console.log(this.props.totalByCountry);

        if(this.props.totalByCountry && this.props.totalByCountry.length > 0){
            return (
                <div style={{height: `700px`}}>
                    <div className="page-header">
                        <h1>Children Problems on Map</h1>
                    </div>

                    <GettingStartedGoogleMap
                        containerElement={
                            <div style={{height: `100%`}}/>
                        }
                        mapElement={
                            <div style={{height: `100%`}}/>
                        }
                        onMapLoad={this.handleMapLoad}
                        onMapClick={this.handleMapClick}
                        markers={this.props.totalByCountry}
                        onMarkerRightClick={this.handleMarkerRightClick}
                    />
                </div>
            );
        }

        return <div className="loader center-block"></div>
    }

}

function mapStateToProps(state) {
    var totalByCountry = state.problems.totalByCountry;
    return {totalByCountry}
}

function mapDispatchToProps(dispatch) {
    return {
        //bindActionCreators({getProblems}, dispatch),
        getTotalChildrenByCountry: () => dispatch(getTotalChildrenByCountry()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapProblems);