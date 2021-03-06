import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';

import { doMatchCreate, doMatchCreateClear } from '../../redux/actions/match';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button, { GhostButton } from '../Button/Button';
import './CreateMatch.css';

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        name: '',
        location: ''
      },
      title: '',
      holesSelect: 18,
      par: 72,
      date: new Date()
    };
  }

  componentWillUnmount() {
    console.log('Component Unmounting');
    this.props.onMatchCreateClear();
  }

  setCourseName = newName => {
    const { course } = this.state;
    let newCourse = { ...course };
    newCourse.name = newName;
    this.setState({ course: newCourse });
  };

  setMatchTitle = newTitle => {
    this.setState({ title: newTitle });
  };

  setCourseLocation = newLocation => {
    const { course } = this.state;
    let newCourse = { ...course };
    newCourse.location = newLocation;
    this.setState({ course: newCourse });
  };

  setCoursePar = par => {
    console.log('this.setCoursePar()');
    let newPar = Number(par);
    this.setState({ par: newPar });
  };

  holeSelectChange = holesSelect => {
    this.setState({ holesSelect: holesSelect.value });
  };

  handleSubmit = e => {
    const { holesSelect, course, date, title, par } = this.state;
    const { xAuth } = this.props;
    const match = {
      course,
      title,
      numberHoles: holesSelect,
      par,
      date
    };
    e.preventDefault();
    console.log('Form Submitted');
    // TODO:
    //   - Run Validation -> display errors if necessary
    this.props.onMatchCreate(match, xAuth);
    //   - Display errors or route to first hole form
  };

  render() {
    const { holesSelect, course, title, par } = this.state;
    const { postError, postSuccess, createdMatchId } = this.props;

    return (
      <div className="pg_width create_match">
        <h1>Create New Match</h1>
        {postSuccess && createdMatchId ? (
          <div className="post_success_message">
            <h3>Let's Golf!</h3>
            <Redirect to={`/play/${createdMatchId}/hole/1`} />
          </div>
        ) : (
          <form
            onSubmit={e => this.handleSubmit(e)}
            className="create_match_form"
          >
            {postError && (
              <ErrorMessage errorMsg="There was an error creating this match. Please refresh the page and try again." />
            )}
            <fieldset>
              <legend>Course Info</legend>
              <InputField
                labelText="Match Title"
                value={title}
                name="match_title"
                onChange={e => this.setMatchTitle(e.target.value)}
                required
              />
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
                  value={par}
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
                    { value: 6, label: '6 Holes' },
                    { value: 9, label: '9 Holes' },
                    { value: 18, label: '18 Holes' },
                    { value: 27, label: '27 Holes' },
                    { value: 36, label: '36 Holes' }
                  ]}
                />
              </div>
              <div className="submit_container">
                <input type="submit" value="Start Round" className="button" />
              </div>
            </div>
          </form>
        )}
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
    <Link to="/new-match" className="create_match_btn">
      <GhostButton>+ New Round</GhostButton>
    </Link>
  );
};

const CreateFirstMatchButton = () => {
  return (
    <Link to="/new-match" className="create_match_btn">
      <Button>Start a Round</Button>
    </Link>
  );
};

const mapStateToProps = state => {
  const { createMatchState } = state;
  return {
    postError: createMatchState.createMatchError,
    postSuccess: createMatchState.createMatchSuccess,
    createdMatchId: createMatchState.createdMatchId,
    xAuth: state.authenticationState.xAuth
  };
};

const mapDispatchToProps = dispatch => ({
  onMatchCreate: (match, xAuth) => dispatch(doMatchCreate(match, xAuth)),
  onMatchCreateClear: () => dispatch(doMatchCreateClear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMatch);

// export default CreateMatch;
export { CreateMatchButton, CreateFirstMatchButton, InputField };
