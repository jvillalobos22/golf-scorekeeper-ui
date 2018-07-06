import React, { Component } from 'react';
import './Authenticate.css';
import CreateUserForm from './CreateUserForm';
import LoginForm from './LoginForm';

// const Authenticate = ({ signup, setPgClass }) => {
class Authenticate extends Component {
  componentDidMount() {
    const { pgClass } = this.props;
    if (!pgClass.includes('authenticate'))
      this.props.setPgClass('authenticate');
  }

  componentWillUnmount() {
    this.props.setPgClass('');
  }

  render() {
    const { signup } = this.props;
    return (
      <div className="pg_width">
        <div className="authenticate_container">
          {signup ? (
            <CreateUserForm setForm={() => this.setCreateNewUser(false)} />
          ) : (
            <LoginForm setForm={() => this.setCreateNewUser(true)} />
          )}
        </div>
      </div>
    );
  }
}

export default Authenticate;
