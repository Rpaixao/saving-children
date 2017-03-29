import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProblem, closeProblem, unloadSelectedProblem } from '../../actions/index'
import { Link } from 'react-router';

class ProblemShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.getProblem(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.unloadSelectedProblem();
  }

  onCloseClick() {
      let response = this.props.closeProblem(this.props.problem);

      if(response.type === "CLOSE_PROBLEM") {
          this.context.router.push('/problems/' + this.props.problem.key);
      }
  }

  renderCloseButton(problem){
      if(problem.status !== 'C'){
          return (
              <div className="btn pull-right">
                  <button
                      className="btn btn-danger"
                      onClick={this.onCloseClick.bind(this)}>
                      Close Problem
                  </button>
              </div>
          )
      } else {
          return(<div></div>)
      }
  }

  render() {
    const { problem } = this.props;

    if(problem && problem.key === '-1')  {
        return <div>An error has ocorred. Please try again</div>;
    }

    if (!problem) {
      return <div>Loading...</div>;
    }

    return (
      <div>
          { this.renderCloseButton(problem) }

          <div key={problem.key}>

              <div className="page-header">
                    <h1>{problem.title} <small>{problem.status === 'C' ? '[CLOSED] ' : 'OPEN'}</small></h1>
              </div>

              <div className="panel panel-default">
                  <div className="panel-body">
                      <p className="list-group-item-text">{ problem.situation }</p>
                  </div>
                  <div className="panel-footer">{ problem.categories }</div>
              </div>

              <h2 className="list-group-item-text text-right">{ problem.location }</h2>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { problem: state.problems.selectedProblem };
}

export default connect(mapStateToProps, { getProblem, closeProblem, unloadSelectedProblem})(ProblemShow);
