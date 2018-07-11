import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getLoggedInUser } from '../../redux/selectors/user';
import LoginButton from '../Authenticate/LoginButton';
import UserDropdown from './UserDropdown/UserDropdown';
import './Header.css';

const Header = ({ user }) => {
  return (
    <header className="app_header">
      <div className="pg_width">
        <div className="header_flex">
          <Link to="/" className="header_logo">
            <h2 className="app_title">
              <FontAwesomeIcon icon="golf-ball" /> myCaddie
            </h2>
          </Link>
          {user ? (
            <UserInfo user={user} />
          ) : (
            <LoginButton className="header_login" />
          )}
        </div>
      </div>
    </header>
  );
};

const UserInfo = ({ user }) => {
  return (
    <div className="user_info">
      <p>Welcome back, {user.displayName}</p>
      <UserDropdown>
        <div className="user_avatar">
          {user && user.displayName.charAt(0).toUpperCase()}
        </div>
      </UserDropdown>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: getLoggedInUser(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
