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

        console.log("Marker PRessed");
        this.props.selectCountry(selectedCountry);
        console.log("Country Selected");
        this.props.getProblems(selectedCountry.name, parseInt(this.state.term));
        this.context.router.push('/map/list/' + country[0]);
    }

    onInputChange(term) {
        this.setState({term});
        this.props.getTotalChildrenByCountry(parseInt(term));
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
                <div className="row">
                    <div className="col-xs-12" style={{height: window.innerHeight - 100}}>
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

                    <div className="row map-inner-form-panel col-sm-5">
                        <nav className="navbar navbar-default">
                            <div className="container-fluid">

                                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul className="nav navbar-nav">
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Type of Search <span className="caret"></span></a>
                                            <ul className="dropdown-menu">
                                                <li><a href="#">Any</a></li>
                                                <li role="separator" className="divider"></li>
                                                <li><a href="#">Children Support</a></li>
                                                <li><a href="#">Charity Events</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <form className="navbar-form navbar-left" >
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Search" value={this.state.term} onChange={event => this.onInputChange(event.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-default">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div className="map-inner-panel map-inner-panel-mobile">
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