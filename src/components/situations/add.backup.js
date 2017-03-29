import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { addProblem } from '../../actions/index'

class AddForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

  render() {
      const { fields: { title, situation, categories, location } , handleSubmit } = this.props;

    return (
        <form onSubmit={handleSubmit(this.props.addProblem)} >
          <h3>Report a Problem</h3>

            <div className={`form-group ${title.touched && title.invalid ? 'has-danger': ''}`}>
                <label>Title</label>
                <input type="text" className="form-control" {...title}/>
                <div className="text-help">
                    {title.touched && title.error}
                </div>
            </div>

            <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger': ''}`}>
                <label>Categories</label>
                <input type="text" className="form-control" {...categories}/>
                <div className="text-help">
                    {categories.touched && categories.error}
                </div>
            </div>

            <div className={`form-group ${situation.touched && situation.invalid ? 'has-danger': ''}`}>
                <label>Description</label>
                <textarea type="text" className="form-control" {...situation}/>
                <div className="text-help">
                    {situation.touched && situation.error}
                </div>
            </div>

            <div className={`form-group ${location.touched && location.invalid ? 'has-danger': ''}`}>
                <label>Location</label>
                <textarea type="text" className="form-control" {...location}/>
                <div className="text-help">
                    {location.touched && location.error}
                </div>
            </div>

            <div className="text-xs-right">
                <button type="submit" className="btn btn-success">
                   Finish registration!
                </button>
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
