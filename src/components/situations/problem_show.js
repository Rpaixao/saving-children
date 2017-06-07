import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProblem, closeProblem, unloadSelectedProblem } from '../../actions/index';
import { Modal, Button } from 'react-bootstrap';

function getImageURL(children){
    if(children.source === 'UNBOUND'){
        return 'https://www.unbound.org' + children.photoURL;
    } else if (children.source === 'WORLDVISION' || children.source === 'CCFCanada' || children.source === 'COMPASSION'){
        return children.photoURL;
    }
}

class ProblemShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
      super(props);

      this.state = {
          showModal: false
      };
  }

  componentWillMount() {
    this.props.getProblem(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.unloadSelectedProblem();
  }

  render() {
    const { problem } = this.props;

    if(problem && problem.key === '-1')  {
        return <div>An error has ocorred. Please try again</div>;
    }

    if (!problem) {
      return <div className="loader center-block"></div>;
    }

    let childrenBaseInformation = problem[0][0].data;

      /* TODO: Dinamizar isto consoante a organização. Neste momento está estatico para o worldvision */
    let childrenDetailURL =  "https://donate.worldvision.org/singlepagecheckout/cart/addProducts?itemId[]=" + childrenBaseInformation.sourceID + "&newSpon[]=1"

      /* TODO: Link da organização está estática para o world vision*/
    return (

        <div className="panel panel-default">

            <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                <Modal.Header >
                    <Modal.Title>More about { childrenBaseInformation.name }, { childrenBaseInformation.age } years old</Modal.Title>
                    <a target="_blank" href="https://www.worldvision.org/about-us" className="btn btn-primary btn-xs a-margin">{ childrenBaseInformation.source }</a>
                </Modal.Header>
                <Modal.Body>

                    <h4>My History</h4>
                    <p>{ childrenBaseInformation.summary }</p>

                    <h4>My Video</h4>
                    <div className="text-center">
                        <video name="media" width="320" height="240" controls autoPlay>
                            <source src={childrenBaseInformation.videoURL} type="video/mp4"/>
                        </video>
                    </div>

                    <a target="_blank" href={childrenDetailURL} className="btn btn-primary btn-lg btn-block a-margin">Help me !</a>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.setState({showModal: false})}>Close</Button>
                </Modal.Footer>
            </Modal>
            
            <div className="panel-heading">
                <a target="_blank" href="javascript:history.back()" className="btn btn-primary btn-xs a-margin">Back</a>
                <h3> { childrenBaseInformation.name } </h3>
                <h6> { childrenBaseInformation.age } years old</h6>
                <h5> { childrenBaseInformation.source } </h5>
            </div>

            <div className="panel-body">
                 <div className="text-center">
                     <img src={getImageURL(childrenBaseInformation)} className="img-circle img-margin" width="100" height="110" />
                      <h5> { childrenBaseInformation.summary } </h5>
                     <div className="btn-group btn-group-justified">
                         <a href="#" onClick={() => this.setState({showModal: true})} className="btn btn-default">More about me</a>
                     </div>
                </div>
            </div>

            <div className="panel-footer">
                <a target="_blank" href={childrenDetailURL} className="btn btn-primary btn-lg btn-block a-margin">Help me !</a>
            </div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  return { problem: state.problems.selectedProblem };
}

export default connect(mapStateToProps, { getProblem, closeProblem, unloadSelectedProblem})(ProblemShow);
