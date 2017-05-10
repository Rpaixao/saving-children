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

            var children = problem[0].data;
            
            return (

                <div key={children.key} className="list-group">
                    <Link to={"/problems/" + problem.key} className="list-group-item">
                        <div className="row">
                        <div className="col-xs-2">
                            <img src={'https://www.unbound.org' + children.photoURL} class="img-circle" alt="Cinque Terre" width="100" height="80"/>
                        </div>
                        <div className="col-xs-10">
                            <h4 className="list-group-item-heading">{ children.name }</h4>
                            <p className="list-group-item-text"><b>age: </b> { children.age }</p>
                            <p className="list-group-item-text"><b>location: </b> { children.country }</p>
                            <p className="list-group-item-text"><b>source: </b> { children.source }</p>
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
