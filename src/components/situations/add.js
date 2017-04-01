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
                <input type="text" id="title" className="form-control" {...title}/>
                <label className="control-label" for="title">{title.touched && title.error}</label>
            </div>

            <div className={`form-group ${categories.touched && categories.invalid ? 'has-error': ''}`}>
                <label>Category</label>
                <select className="form-control" id="categories" {...categories}>
                    <option>Select a category</option>
                    <option>negligence</option>
                    <option>poverty</option>
                    <option>school</option>
                </select>
                <label className="control-label" for="categories">{categories.touched && categories.error}</label>
            </div>

            <div className={`form-group ${situation.touched && situation.invalid ? 'has-error': ''}`}>
                <label>Description</label>
                <textarea type="text" className="form-control" id="situation" {...situation}/>
                <label className="control-label" for="situation">{situation.touched && situation.error}</label>
            </div>

            <div className={`form-group ${location.touched && location.invalid ? 'has-error': ''}`}>
                <label>Location</label>
                <textarea type="text" className="form-control" id="location" {...location}/>
                <label className="control-label" for="location">{location.touched && location.error}</label>
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
