import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  doPostSignup,
  doPostSignupErrorClear
} from '../../redux/actions/authenticate';
import { InputField } from './LoginForm';
import { InlineButton } from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const { signup_error, onErrorClear } = this.props;
    if (signup_error) onErrorClear();
    this.setState({
      [e.target.name]: e.target.value.trim()
    });
  };

  handleSubmit = e => {
    const { username, password, confirmPassword, displayName } = this.state;
    e.preventDefault();
    // Perform Validation
    if (this.formIsValid()) {
      this.props.onPostSignup({
        username,
        password,
        displayName
      });
      console.log('submit');
    }
  };

  formIsValid = () => {
    const { username, password, confirmPassword, displayName } = this.state;
    if (!this.isValidUsername(username)) return false;

    if (
      !this.passwordIsValid(password) ||
      !this.passwordsMatch(password, confirmPassword)
    )
      return false;

    if (!displayName) return false;

    return true;
  };

  passwordIsValid = password => {
    return password.length > 3;
  };

  passwordsMatch = (password1, password2) => {
    return password1 != '' && password1 === password2;
  };

  isValidUsername = username => {
    if (username.length < 4) {
      return false;
    }
    if (username.includes(' ')) {
      return false;
    }
    return true;
  };

  render() {
    const { username, password, confirmPassword, displayName } = this.state;
    const { loggedIn, login_error, signup_error } = this.props;
    const formIssues = {
      validPassword: password && !this.passwordIsValid(password) ? false : true,
      passwordsMatch:
        confirmPassword && !this.passwordsMatch(password, confirmPassword)
          ? false
          : true,
      validUsername: username && !this.isValidUsername(username) ? false : true
    };

    let signupErrMsg;

    if (signup_error && signup_error.code === 11000) {
      signupErrMsg = 'There is already a user with that username.';
    } else {
      signupErrMsg =
        'There was a problem creating your profile. Please try again.';
    }

    return loggedIn ? (
      <Redirect to={`/`} />
    ) : (
      <div className="create_user_form">
        <h2 className="topheader">Create an Account</h2>
        {signup_error && <ErrorMessage errorMsg={signupErrMsg} />}
        <form onSubmit={e => this.handleSubmit(e)}>
          <InputField
            labelText="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            required
            className={
              !formIssues.validUsername ? 'input_validation_issue' : ''
            }
          />
          {!formIssues.validUsername && (
            <ValidationError>
              Username must be at least 4 characters long and contain no spaces
            </ValidationError>
          )}
          <InputField
            labelText="Display Name (shown on scorecards)"
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            required
          />
          <InputField
            labelText="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            required
            className={
              !formIssues.validPassword ? 'input_validation_issue' : ''
            }
          />
          {!formIssues.validPassword && (
            <ValidationError>
              Passwords must be at least 4 characters
            </ValidationError>
          )}
          <InputField
            labelText="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            required
            className={
              !formIssues.passwordsMatch ? 'input_validation_issue' : ''
            }
          />
          {!formIssues.passwordsMatch && (
            <ValidationError>Passwords don't match</ValidationError>
          )}
          <div className="authenticate_btns">
            <Link to="/login">
              <InlineButton>Already a user? Login</InlineButton>
            </Link>
            <input
              className={`button ${!this.formIsValid() ? 'disabled' : ''}`}
              type="submit"
              value="Signup"
            />
          </div>
        </form>
      </div>
    );
  }
}

const ValidationError = ({ children }) => {
  return <div className="validation_error">{children}</div>;
};

const mapStateToProps = state => {
  const { authenticationState } = state;
  return {
    loggedIn: authenticationState.loggedIn,
    signup_error: authenticationState.signup_error,
    user_id: authenticationState.user_id,
    user_display_name: authenticationState.user_display_name,
    login_success: authenticationState.login_success,
    login_error: authenticationState.login_error
  };
};

const mapDispatchToProps = dispatch => ({
  onPostSignup: newUser => dispatch(doPostSignup(newUser)),
  onErrorClear: () => dispatch(doPostSignupErrorClear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserForm);
