import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGIN_ERROR_CLEAR
} from './actionTypes';

const doPostLogin = credentials => {
  return {
    type: POST_LOGIN,
    payload: credentials
  };
};

const doPostLoginSuccess = user => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: user
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

export {
  doPostLogin,
  doPostLoginSuccess,
  doPostLoginError,
  doPostLoginErrorClear
};
