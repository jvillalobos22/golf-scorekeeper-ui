import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { InlineButton } from '../Button/Button';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { username, password } = this.state;
    const { setForm } = this.props;
    return (
      <div className="login_form">
        <h2 className="topheader">Login</h2>
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
            <Link to="/signup">
              <InlineButton>Create new account</InlineButton>
            </Link>
            <input class="button" type="submit" value="Login" />
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

export default LoginForm;
export { InputField };
