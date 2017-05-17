import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function getImageURL(children){
    if(children.source === 'UNBOUND'){
        return 'https://www.unbound.org' + children.photoURL;
    } else if (children.source === 'WORLDVISION' || children.source === 'CCFCanada' || children.source === 'COMPASSION'){
        return children.photoURL;
    }
}

class ListOfProblems extends Component {

    renderProblems(problems){

        return problems.map( function(problem){

            var children = problem[0].data;
            
            return (

                <div key={children.key} className="list-group">
                    <Link to={"/problems/" + problem.key} className="list-group-item">
                        <div className="row">
                        <div className="col-xs-2">
                            <img src={getImageURL(children)} class="img-circle" alt="Cinque Terre" width="45" height="50"/>
                        </div>
                        <div className="col-xs-10">
                            <h4 className="list-group-item-heading">{ children.name }, {children.age}</h4>
                            <p className="list-group-item-text"><b></b> { children.source }</p>
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
                    <div className="list-group">
                        { this.renderProblems(this.props.problems) }
                    </div>
                </div>
            );
        }

        return (
        <div>
            <h4>Selecione um país</h4>
            <div className="loader center-block"></div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    var problems = state.problems.all;

    return { problems }
}

function mapDispatchToProps(dispatch){
    return {
        //bindActionCreators({getProblems}, dispatch),
        //getProblems: () => dispatch(getProblems()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfProblems);
