import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { GhostButton } from '../Button/Button';

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
      date: null
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
      <div className="pg_width">
        <div>Create New Match</div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <fieldset>
            <input
              type="text"
              value={course.name}
              name="course_name"
              onChange={e => this.setCourseName(e.target.value)}
            />
            <input
              type="text"
              value={course.location}
              name="course_location"
              onChange={e => this.setCourseLocation(e.target.value)}
            />
            <NumericInput
              className="course_par_input"
              min={3}
              max={100}
              value={course.par}
              onChange={(num, string, input) => this.setCoursePar(num)}
              strict
            />
            <Select
              name="form-field-name"
              value={holesSelect}
              onChange={this.holeSelectChange}
              options={[
                { value: 9, label: '9 Holes' },
                { value: 18, label: '18 Holes' },
                { value: 27, label: '27 Holes' }
              ]}
            />
            <input type="submit" value="Submit" className="button" />
          </fieldset>
        </form>
      </div>
    );
  }
}

const CreateMatchButton = () => {
  return (
    <Link to="/new-match">
      <GhostButton>+ New Match</GhostButton>
    </Link>
  );
};

export default CreateMatch;
export { CreateMatchButton };
