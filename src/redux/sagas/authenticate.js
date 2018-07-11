import { call, put } from 'redux-saga/effects';
import {
  postLogin,
  postSignup,
  getUser,
  deleteLogout
} from '../../api/authenticate';
import {
  doPostLoginSuccess,
  doPostLoginError,
  doGetUserFailure,
  doGetUserSuccess,
  doLogoutSuccess,
  doLogoutError,
  doPostSignupSuccess,
  doPostSignupError
} from '../actions/authenticate';

function* handlePostLogin(action) {
  const { payload } = action;

  try {
    console.log('handlePostLogin()');
    const result = yield call(postLogin, payload);
    const xAuth = localStorage.getItem('x-auth');
    yield put(doPostLoginSuccess(result, xAuth));
    localStorage.setItem(
      'authenticationState',
      JSON.stringify({
        loggedIn: true,
        user: result
      })
    );
  } catch (error) {
    yield put(doPostLoginError(error));
  }
}

function* handleSignup(action) {
  try {
    console.log('handleSignup()');
    const result = yield call(postSignup, action.payload.user);
    const xAuth = localStorage.getItem('x-auth');
    yield put(doPostSignupSuccess(result, xAuth));
    localStorage.setItem(
      'authenticationState',
      JSON.stringify({
        loggedIn: true,
        user: result
      })
    );
  } catch (err) {
    const error = yield err;
    yield put(doPostSignupError(error));
  }
}

function* handleGetUser() {
  try {
    console.log('handleGetUser()');

    const xAuth = localStorage.getItem('x-auth') || null;
    const authState = JSON.parse(localStorage.getItem('authenticationState'));
    const { user, loggedIn } = authState ? authState : null;

    if (user && loggedIn) {
      console.log('user logged in from localStorage');
      yield put(doGetUserSuccess(user, xAuth));
    } else if (xAuth) {
      console.log('x-auth token available, fetching user from server');
      const result = yield call(getUser, xAuth);
      if (result.user !== null) {
        yield put(doGetUserSuccess(result.user, xAuth));
      } else {
        yield put(doGetUserFailure());
      }
    }
  } catch (error) {
    console.log(error);
    yield put(doGetUserFailure());
  }
}

function* handleLogout(action) {
  try {
    console.log('handleLogout()');
    const result = yield call(deleteLogout, action.payload.xAuth);
    yield put(doLogoutSuccess());
    localStorage.clear();
  } catch (error) {
    console.log(error);
    yield put(doLogoutError());
  }
}

export { handlePostLogin, handleGetUser, handleLogout, handleSignup };
