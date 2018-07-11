import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest, loggedIn, xAuth, redirectToLogin }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !redirectToLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  const { authenticationState } = state;
  return {
    loggedIn: authenticationState.loggedIn,
    redirectToLogin: authenticationState.redirectToLogin,
    xAuth: authenticationState.xAuth,
  };
};

// const mapDispatchToProps = dispatch => ({
//   onGetUser: () => dispatch(doGetUser())
// });

export default connect(
  mapStateToProps,
  null
)(ProtectedRoute);
