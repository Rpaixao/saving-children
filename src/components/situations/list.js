import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getProblems, selectCountry } from '../../actions/index'

function getImageURL(children){
    if(children.source === 'UNBOUND'){
        return 'https://www.unbound.org' + children.photoURL;
    } else if (children.source === 'WORLDVISION' || children.source === 'CCFCanada' || children.source === 'COMPASSION'){
        return children.photoURL;
    }
}

class ListOfProblems extends Component {

    static contextTypes = {
        router: PropTypes.object,
    };

    componentWillMount() {
        let age = this.props.params.age ? parseInt(this.props.params.age) : null;
        this.props.getProblems(this.props.params.country, age);
    }

    renderProblems(problems){;

        return problems.map( function(problem){

            var children = problem[0].data;

            return (

                <div key={children.key} >

                        <Link to={"/map/detail/" + children.key} className="list-group-item">
                        <div className="row">
                        <div className="col-xs-2">
                            <img src={getImageURL(children)} class="img-circle" alt="Cinque Terre" width="45" height="50"/>
                        </div>
                        <div className="col-xs-10 text-center">
                            <h4 className="list-group-item-heading">{ children.name }, {children.age}</h4>
                            <h6 className="list-group-item-text"><b></b> { children.source }</h6>
                        </div>
                        </div>
                    </Link>
                </div>
            )


        });

    }

    render() {

        if(this.props.problems && this.props.problems.length > 0){

            return (

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <a target="_blank" href="javascript:history.back()" className="btn btn-primary btn-xs a-margin">Back</a>
                        <h4> { this.props.params.country }</h4>
                        <h6> { this.props.selectedCountry ? 'We have found ' + this.props.selectedCountry.children + ' children in poverty situations in ' + this.props.selectedCountry.name : ''}</h6>
                    </div>
                    <div className="panel-body mygrid-scrollable-div mygrid-scrollable-div-mobile">
                        { this.renderProblems(this.props.problems) }
                    </div>
                </div>
            );
        }

        return (

        <div>
            <div className="loader center-block"></div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    var problems = state.problems.all;
    var selectedCountry = state.problems.selectedCountry;

    return { problems, selectedCountry }
}

export default connect(mapStateToProps, {getProblems, selectCountry})(ListOfProblems);
