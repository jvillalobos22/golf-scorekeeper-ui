import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_ERROR_CLEAR,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGIN_ERROR_CLEAR,
  POST_SIGNUP,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_ERROR,
  POST_SIGNUP_ERROR_CLEAR
} from './actionTypes';

const doPostLogin = credentials => {
  return {
    type: POST_LOGIN,
    payload: credentials
  };
};

const doPostLoginSuccess = (user, xAuth) => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: {
      user,
      xAuth
    }
  };
};

const doPostLoginError = error => {
  return {
    type: POST_LOGIN_ERROR,
    error: 'Invalid login, please try again.'
  };
};

const doPostLoginErrorClear = error => {
  return {
    type: POST_LOGIN_ERROR_CLEAR
  };
};

const doGetUser = () => {
  return {
    type: GET_USER
  };
};

const doGetUserSuccess = (user, xAuth) => {
  return {
    type: GET_USER_SUCCESS,
    payload: {
      user,
      xAuth
    }
  };
};

const doGetUserFailure = () => {
  return {
    type: GET_USER_FAILURE
  };
};

const doLogout = xAuth => {
  return {
    type: LOGOUT,
    payload: {
      xAuth
    }
  };
};

const doLogoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const doLogoutError = () => {
  return {
    type: LOGOUT_ERROR
  };
};

const doLogoutErrorClear = () => {
  return {
    type: LOGOUT_ERROR_CLEAR
  };
};

const doPostSignup = newUser => {
  return {
    type: POST_SIGNUP,
    payload: {
      user: newUser
    }
  };
};

const doPostSignupSuccess = (user, xAuth) => {
  return {
    type: POST_SIGNUP_SUCCESS,
    payload: {
      user,
      xAuth
    }
  };
};

const doPostSignupError = error => {
  return {
    type: POST_SIGNUP_ERROR,
    error
  };
};

const doPostSignupErrorClear = () => {
  return {
    type: POST_SIGNUP_ERROR_CLEAR
  };
};

export {
  doGetUser,
  doGetUserSuccess,
  doGetUserFailure,
  doLogout,
  doLogoutSuccess,
  doLogoutError,
  doLogoutErrorClear,
  doPostLogin,
  doPostLoginSuccess,
  doPostLoginError,
  doPostLoginErrorClear,
  doPostSignup,
  doPostSignupSuccess,
  doPostSignupError,
  doPostSignupErrorClear
};
