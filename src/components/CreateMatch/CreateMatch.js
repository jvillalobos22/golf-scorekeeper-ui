import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { GhostButton } from '../Button/Button';
import './CreateMatch.css';

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holesSelect: 18,
      course: {
        name: '',
        location: '',
        par: 72
      },
      date: new Date()
    };
  }

  setCourseName = newName => {
    const { course } = this.state;
    let newCourse = { ...course };
    newCourse.name = newName;
    this.setState({ course: newCourse });
  };

  setCourseLocation = newLocation => {
    const { course } = this.state;
    let newCourse = { ...course };
    newCourse.location = newLocation;
    this.setState({ course: newCourse });
  };

  setCoursePar = par => {
    const { course } = this.state;
    let newCourse = { ...course };
    newCourse.par = Number(par);
    this.setState({ course: newCourse });
  };

  holeSelectChange = holesSelect => {
    this.setState({ holesSelect: holesSelect.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('Form Submitted');
    // TODO:
    //   - Run Validation -> display errors if necessary
    //   - POST Call ( Redux Action Creator )
    //   - Display errors or route to first hole form
  };

  render() {
    const { holesSelect, course } = this.state;
    return (
      <div className="pg_width create_match">
        <h1>Create New Match</h1>
        <form
          onSubmit={e => this.handleSubmit(e)}
          className="create_match_form"
        >
          <fieldset>
            <legend>Course Info</legend>
            <InputField
              labelText="Course Name"
              value={course.name}
              name="course_name"
              onChange={e => this.setCourseName(e.target.value)}
              required
            />
            <InputField
              labelText="Location"
              value={course.location}
              name="course_location"
              onChange={e => this.setCourseLocation(e.target.value)}
              required
            />
            <div className="par_input_container">
              <label>Par</label>
              <NumericInput
                className="course_par_input"
                min={3}
                max={100}
                value={course.par}
                onChange={(num, string, input) => this.setCoursePar(num)}
                strict
                required
              />
            </div>
          </fieldset>
          <div className="hole_select">
            <div className="input_field">
              <label>Number of Holes</label>
              <Select
                name="number_holes"
                value={holesSelect}
                clearable={false}
                required
                onChange={this.holeSelectChange}
                options={[
                  { value: 9, label: '9 Holes' },
                  { value: 18, label: '18 Holes' },
                  { value: 27, label: '27 Holes' }
                ]}
              />
            </div>
            <div className="submit_container">
              <input type="submit" value="Start Match" className="button" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const InputField = ({ className, labelText, ...rest }) => {
  return (
    <div className={className ? `input_field ${className}` : 'input_field'}>
      {labelText && <label>{labelText}</label>}
      <input type="text" {...rest} />
    </div>
  );
};

const CreateMatchButton = () => {
  return (
    <Link to="/new-match">
      <GhostButton>+ New Match</GhostButton>
    </Link>
  );
};

export default CreateMatch;
export { CreateMatchButton };
