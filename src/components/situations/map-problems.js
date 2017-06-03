/* global google */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    withGoogleMap,
    GoogleMap,
    Marker
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
                    options={{label: marker[3].toString()}}
                >

                    </Marker>
            ))
        }

    </GoogleMap>
));

class MapProblems extends Component {

    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    onMarkerPress = this.onMarkerPress.bind(this);

    componentWillMount() {
        this.props.getTotalChildrenByCountry();
    }

    onMarkerPress(country){
        let selectedCountry = {
            name: country[0],
            lat: country[1],
            lng: country[2],
            children: country[3]
        }

        this.props.selectCountry(selectedCountry);
        this.props.getProblems(selectedCountry.name, parseInt(this.state.term));
        this.context.router.push('/map/list/' + country[0] + '/' + parseInt(this.state.term));
    }

    onInputChange(term) {
        this.setState({term});
        //this.props.getTotalChildrenByCountry(parseInt(term));
    }

    onEnterPress() {
        this.props.getTotalChildrenByCountry(parseInt(this.state.term));
    }

    render() {

        if(this.props.totalByCountry && this.props.totalByCountry.length > 0){
            const isMobile = window.innerWidth <= 500;

            if(isMobile && this.props.routes[this.props.routes.length - 1].path !== "/map"){
                return (
                    <div>
                        <div className="map-inner-panel map-inner-panel-mobile">
                            <div className="col-xs-12">
                                {this.props.sidebar}
                            </div>
                        </div>
                    </div>
                )
            }

        }
        return (
            <div className="col-xs-12">

                <div className="input-group col-xs-12">
                    <span className="input-group-addon" id="basic-addon1">Filters</span>
                    <input type="text" className="form-control" placeholder="Filter by age, name and/or problem (separated by a comma)"
                           value={this.state.term}
                           onKeyPress={(e => {
                               if(e.key === 'Enter') {
                                   this.onEnterPress(event.target.value);
                               }
                           })}
                           onChange={event => this.onInputChange(event.target.value)} />
                    <span className="input-group-addon" id="basic-addon1">(Enter to Submit)</span>
                </div>

                <div className="row">
                    <div className="col-xs-12 map-container" style={{height: window.innerHeight - 100 - 80}}>
                        <GettingStartedGoogleMap
                            containerElement={
                                <div style={{height: `100%`}}/>
                            }
                            mapElement={
                                <div style={{height: `100%`}}/>
                            }
                            onMarkerPress = {this.onMarkerPress}
                            markers={this.props.totalByCountry}
                        >

                        </GettingStartedGoogleMap>
                    </div>

                    <div className="map-inner-panel map-inner-panel-mobile" >
                        <div className="col-xs-12">
                            {this.props.sidebar}
                        </div>
                    </div>
                </div>
            </div>
        );

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
        getTotalChildrenByCountry: (term) => dispatch(getTotalChildrenByCountry(term)),
        selectCountry: (country) => dispatch(selectCountry(country)),
        getProblems: (country, term) => dispatch(getProblems(country, term))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapProblems);