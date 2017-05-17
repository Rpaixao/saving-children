import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListOfProblems from './list';

import {
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

import { getTotalChildrenByCountry, selectCountry, getProblems } from '../../actions/index'

const GettingStartedGoogleMap = withGoogleMap(props => (

    <GoogleMap
        defaultZoom={2}
        defaultCenter={{ lat: 0, lng: 0 }} >
        {
            props.markers.map(marker => (
                <Marker key={marker[0]}
                    onClick={() => props.onMarkerPress(marker)}
                    defaultAnimation = {2}
                    position = {{
                        lat: marker[1],
                        lng: marker[2]}
                    }
                />
            ))
        }
    </GoogleMap>
));

class MapProblems extends Component {

    onMarkerPress = this.onMarkerPress.bind(this);

    componentWillMount() {
        this.props.getTotalChildrenByCountry();
    }

    onMarkerPress(country){
        console.log(country)
        let selectedCountry = {
            name: country[0],
            lat: country[1],
            lng: country[2],
            children: country[3]
        }
        this.props.selectCountry(selectedCountry);
        this.props.getProblems(selectedCountry.name);
    }

    render() {

        if(this.props.totalByCountry && this.props.totalByCountry.length > 0){
            return (
                <div>
                    <div className="page-header">
                        <h1>Children Problems on Map</h1>
                    </div>
                    <div className="row">
                        <div className="col-xs-8" style={{height: `500px`}}>
                            <GettingStartedGoogleMap
                                containerElement={
                                    <div style={{height: `100%`}}/>
                                }
                                mapElement={
                                    <div style={{height: `100%`}}/>
                                }
                                onMarkerPress = {this.onMarkerPress}
                                markers={this.props.totalByCountry}
                            />
                        </div>
                        <div className="col-xs-4">
                            <div class="panel-heading">
                                <h4> { this.props.selectedCountry ? this.props.selectedCountry.name : ''}</h4>
                                <h6> { this.props.selectedCountry ? 'There are ' + this.props.selectedCountry.children + ' children in poverty situations in ' + this.props.selectedCountry.name : ''}</h6>
                            </div>
                            <div class="panel-body">
                                <ListOfProblems/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <div className="loader center-block"></div>
    }

}

function mapStateToProps(state) {
    var totalByCountry = state.problems.totalByCountry;
    var selectedCountry = state.problems.selectedCountry;

    return {
        totalByCountry: totalByCountry,
        selectedCountry: selectedCountry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //bindActionCreators({getProblems}, dispatch),
        getTotalChildrenByCountry: () => dispatch(getTotalChildrenByCountry()),
        selectCountry: (country) => dispatch(selectCountry(country)),
        getProblems: (country) => dispatch(getProblems(country))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapProblems);