import React, { Component, PropTypes } from 'react';
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

    static contextTypes = {
        router: PropTypes.object
    };

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
        this.context.router.push('/map/list/' + country[0]);
    }

    render() {

        if(this.props.totalByCountry && this.props.totalByCountry.length > 0){
            return (
                <div>
                    <div className="row">
                        <div className="col-xs-12" style={{height: `700px`}}>
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
                        <div className="map-inner-panel">
                            <div className="col-xs-12">
                                    {this.props.sidebar}
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