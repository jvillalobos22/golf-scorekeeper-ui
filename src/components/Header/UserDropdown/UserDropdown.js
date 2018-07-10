import React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../Dropdown/Dropdown';

const UserDropdown = ({ xAuth, children }) => {
  const callXAuth = () => {
    console.log('Dropdown xAuth');
    console.log(xAuth);
  };

  const listArray = [
    {
      label: 'Logout',
      onClick: () => callXAuth()
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

export default connect(
  mapStateToProps,
  null
)(UserDropdown);
