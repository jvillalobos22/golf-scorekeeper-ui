import React from 'react';
import { Link } from 'react-router-dom';

import { GhostButton } from '../Button/Button';

const LoginButton = ({ className }) => {
  return (
    <Link to="/login" className={className}>
      <GhostButton>Login</GhostButton>
    </Link>
  );
};

export default LoginButton;
