import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getProblems } from '../../actions/index'

class ListOfProblems extends Component {

    componentWillMount(){
        this.props.getProblems();
    }

    renderProblems(problems){

        return problems.map( function(problem){
            
            return (

                <div key={problem.key} className="list-group">
                    <Link to={"/problems/" + problem.key} className="list-group-item">
                        <h4 className="list-group-item-heading">{ problem.title } <small>{problem.status === 'C' ? ' [CLOSED] ' : ' [OPEN]'}</small></h4>
                        <p className="list-group-item-text"><b>categories: </b> { problem.categories }</p>
                        <p className="list-group-item-text"><b>location: </b> { problem.location }</p>
                    </Link>
                </div>
            )


        });

    }

    render() {

        if(this.props.problems && this.props.problems.length > 0){

            return (


                <div>
                    <div className="btn pull-right">
                        <Link to="problems/add"  className="btn btn-primary" style={[ { marginTop: 10 } ]}>Report a Problem</Link>
                    </div>
                    <div className="page-header">
                        <h1>Children Problems</h1>
                    </div>

                    <div className="list-group">
                        { this.renderProblems(this.props.problems) }
                    </div>
                </div>
            );
        }

        return <div className="loader center-block"></div>
    }
}

function mapStateToProps(state) {
    var problems = state.problems.all;

    return { problems }
}

function mapDispatchToProps(dispatch){
    return {
        //bindActionCreators({getProblems}, dispatch),
        getProblems: () => dispatch(getProblems()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfProblems);
