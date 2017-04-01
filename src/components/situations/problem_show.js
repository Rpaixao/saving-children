import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProblem, closeProblem, unloadSelectedProblem } from '../../actions/index'

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
      return <div className="loader center-block"></div>;
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
                      <h2 className="list-group-item-text text-right">{ problem.location }</h2>
                  </div>
                  <div className="panel-footer">{ problem.categories }</div>
              </div>
          </div>

          <div className="panel panel-default">
              <div className="panel-heading">
                  <i className="fa fa-clock-o fa-fw"></i> Problem Timeline
              </div>

              <div className="panel-body">
                  <ul className="timeline">
                      <li>
                          <div className="timeline-badge"><i className="fa fa-check"></i>
                          </div>
                          <div className="timeline-panel">
                              <div className="timeline-heading">
                                  <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                  <p><small className="text-muted"><i className="fa fa-clock-o"></i> 11 hours ago via Twitter</small>
                                  </p>
                              </div>
                              <div className="timeline-body">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis.</p>
                              </div>
                          </div>
                      </li>
                      <li className="timeline-inverted">
                          <div className="timeline-badge warning"><i className="fa fa-credit-card"></i>
                          </div>
                          <div className="timeline-panel">
                              <div className="timeline-heading">
                                  <h4 className="timeline-title">Lorem ipsum dolor</h4>
                              </div>
                              <div className="timeline-body">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem quibusdam, tenetur commodi provident cumque magni voluptatem libero, quis rerum. Fugiat esse debitis optio, tempore. Animi officiis alias, officia repellendus.</p>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium maiores odit qui est tempora eos, nostrum provident explicabo dignissimos debitis vel! Adipisci eius voluptates, ad aut recusandae minus eaque facere.</p>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div className="timeline-badge danger"><i className="fa fa-bomb"></i>
                          </div>
                          <div className="timeline-panel">
                              <div className="timeline-heading">
                                  <h4 className="timeline-title">Lorem ipsum dolor</h4>
                              </div>
                              <div className="timeline-body">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus numquam facilis enim eaque, tenetur nam id qui vel velit similique nihil iure molestias aliquam, voluptatem totam quaerat, magni commodi quisquam.</p>
                              </div>
                          </div>
                      </li>
                      <li className="timeline-inverted">
                          <div className="timeline-panel">
                              <div className="timeline-heading">
                                  <h4 className="timeline-title">Lorem ipsum dolor</h4>
                              </div>
                              <div className="timeline-body">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est quaerat asperiores sapiente, eligendi, nihil. Itaque quos, alias sapiente rerum quas odit! Aperiam officiis quidem delectus libero, omnis ut debitis!</p>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div className="timeline-badge info"><i className="fa fa-save"></i>
                          </div>
                          <div className="timeline-panel">
                              <div className="timeline-heading">
                                  <h4 className="timeline-title">Lorem ipsum dolor</h4>
                              </div>
                              <div className="timeline-body">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis minus modi quam ipsum alias at est molestiae excepturi delectus nesciunt, quibusdam debitis amet, beatae consequuntur impedit nulla qui! Laborum, atque.</p>
                                  <hr/>
                                      <div className="btn-group">
                                          <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                                              <i className="fa fa-gear"></i> <span className="caret"></span>
                                          </button>
                                          <ul className="dropdown-menu" role="menu">
                                              <li><a href="#">Action</a>
                                              </li>
                                              <li><a href="#">Another action</a>
                                              </li>
                                              <li><a href="#">Something else here</a>
                                              </li>
                                              <li className="divider"></li>
                                              <li><a href="#">Separated link</a>
                                              </li>
                                          </ul>
                                      </div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div className="timeline-panel">
                              <div className="timeline-heading">
                                  <h4 className="timeline-title">Lorem ipsum dolor</h4>
                              </div>
                              <div className="timeline-body">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi fuga odio quibusdam. Iure expedita, incidunt unde quis nam! Quod, quisquam. Officia quam qui adipisci quas consequuntur nostrum sequi. Consequuntur, commodi.</p>
                              </div>
                          </div>
                      </li>
                      <li className="timeline-inverted">
                          <div className="timeline-badge success"><i className="fa fa-graduation-cap"></i>
                          </div>
                          <div className="timeline-panel">
                              <div className="timeline-heading">
                                  <h4 className="timeline-title">Lorem ipsum dolor</h4>
                              </div>
                              <div className="timeline-body">
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati, quaerat tempore officia voluptas debitis consectetur culpa amet, accusamus dolorum fugiat, animi dicta aperiam, enim incidunt quisquam maxime neque eaque.</p>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { problem: state.problems.selectedProblem };
}

export default connect(mapStateToProps, { getProblem, closeProblem, unloadSelectedProblem})(ProblemShow);
