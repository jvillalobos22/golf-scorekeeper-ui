import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  doPostLogin,
  doPostLoginErrorClear
} from '../../redux/actions/authenticate';
import { InlineButton } from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    const { login_error, onErrorClear } = this.props;
    if (login_error) onErrorClear();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(event) {
    const { username, password } = this.state;
    event.preventDefault();
    console.log('handleSubmit');

    const credentials = {
      username,
      password
    };

    this.props.onPostLogin(credentials);
  }

  render() {
    const { username, password } = this.state;
    const { setForm, loggedIn, login_error } = this.props;
    return loggedIn ? (
      <Redirect to={`/`} />
    ) : (
      <div className="login_form">
        <h2 className="topheader">Login</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          {login_error && <ErrorMessage errorMsg={login_error} />}
          <InputField
            labelText="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <InputField
            labelText="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <div className="authenticate_btns">
            <Link to="/signup">
              <InlineButton>Create new account</InlineButton>
            </Link>
            <input className="button" type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

const InputField = ({ className, labelText, name, type, ...rest }) => {
  return (
    <div className={className ? `input_field ${className}` : 'input_field'}>
      {labelText && <label>{labelText}</label>}
      <input type={type} name={name} {...rest} />
    </div>
  );
};

const mapStateToProps = state => {
  const { authenticationState } = state;
  return {
    loggedIn: authenticationState.loggedIn,
    user_id: authenticationState.user_id,
    user_display_name: authenticationState.user_display_name,
    login_success: authenticationState.login_success,
    login_error: authenticationState.login_error
  };
};

const mapDispatchToProps = dispatch => ({
  onPostLogin: credentials => dispatch(doPostLogin(credentials)),
  onErrorClear: () => dispatch(doPostLoginErrorClear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export { InputField };
