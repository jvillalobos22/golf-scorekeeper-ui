import React from 'react';
import { connect } from 'react-redux';
import { doLogout } from '../../../redux/actions/authenticate';
import Dropdown from '../../Dropdown/Dropdown';

const UserDropdown = ({ xAuth, children, onLogout }) => {
  const callLogout = () => {
    onLogout(xAuth);
  };

  const listArray = [
    {
      label: 'Logout',
      onClick: () => callLogout()
    }
  ];

  return (
    <Dropdown className="header_dropdown" listArray={listArray}>
      {children}
    </Dropdown>
  );
};

const mapStateToProps = state => {
  return {
    xAuth: state.authenticationState.xAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: xAuth => dispatch(doLogout(xAuth))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDropdown);
