import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { addProblem } from '../../actions/index'
import { Link } from 'react-router';

class AddForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(problem){
        /*this.props.addProblem(problem).then(() => {
             this.context.router.push('/problems/')
        });*/

        let response = this.props.addProblem(problem);

        if(response.type === "ADD_PROBLEM") {
            this.context.router.push('/problems/');
        }

    }

  render() {
      const { fields: { title, situation, categories, location } , handleSubmit } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <h1>Report a Problem</h1>

            <div className={`form-group ${title.touched && title.invalid ? 'has-error': ''}`}>
                <label>Title</label>
                <input type="text" className="form-control" {...title}/>
                <div className="text-help">
                    {title.touched && title.error}
                </div>
            </div>

            <div className={`form-group ${categories.touched && categories.invalid ? 'has-error': ''}`}>
                <label>Categories</label>
                <input type="text" className="form-control" {...categories}/>
                <div className="text-help">
                    {categories.touched && categories.error}
                </div>
            </div>

            <div className={`form-group ${situation.touched && situation.invalid ? 'has-error': ''}`}>
                <label>Description</label>
                <textarea type="text" className="form-control" {...situation}/>
                <div className="text-help">
                    {situation.touched && situation.error}
                </div>
            </div>

            <div className={`form-group ${location.touched && location.invalid ? 'has-error': ''}`}>
                <label>Location</label>
                <textarea type="text" className="form-control" {...location}/>
                <div className="text-help">
                    {location.touched && location.error}
                </div>
            </div>

            <div className="btn pull-right btn-group">
                <button type="submit" className="btn btn-success">
                   Submit
                </button>
                <Link to="/problems/" className="btn btn-danger">Cancel</Link>
            </div>
        </form>
    );
  }
}

function validate(values){
    const errors = {};

    if(!values.title){
        errors.title = 'Enter a title'
    }

    if(!values.situation){
        errors.situation = 'Enter a description'
    }

    if(!values.categories){
        errors.categories = 'Enter at least one category'
    }

    if(!values.location){
        errors.location = 'Enter a location'
    }

    return errors;
}

export default reduxForm({
    form: 'AddProblemForm',
    fields: ['title', 'situation', 'categories', 'location'],
    validate
}, null, { addProblem }) (AddForm);
