import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { InputField } from './LoginForm';
import { InlineButton } from '../Button/Button';

class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    const { username, password } = this.state;
    const { setForm } = this.props;
    return (
      <div className="create_user_form">
        <h2 className="topheader">Create an Account</h2>
        <form>
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
            <Link to="/login">
              <InlineButton>Already a user? Login</InlineButton>
            </Link>
            <input class="button" type="submit" value="Signup" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUserForm;
