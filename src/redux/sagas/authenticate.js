import { call, put } from 'redux-saga/effects';
import { postLogin, getUser, deleteLogout } from '../../api/authenticate';
import {
  doPostLoginSuccess,
  doPostLoginError,
  doGetUserFailure,
  doGetUserSuccess,
  doLogoutSuccess,
  doLogoutError
} from '../actions/authenticate';

function* handlePostLogin(action) {
  const { payload } = action;

  try {
    console.log('handlePostLogin()');
    console.log(action.payload);
    const result = yield call(postLogin, payload);
    console.log('result', result);
    const xAuth = localStorage.getItem('x-auth');
    yield put(doPostLoginSuccess(result, xAuth));
    console.log('localstorage', JSON.stringify(result));
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
    yield put(doGetUserFailure());
  }
}

function* handleLogout(action) {
  try {
    console.log('handleLogout()');
    const result = yield call(deleteLogout, action.payload.xAuth);
    console.log(result);
    yield put(doLogoutSuccess());
    localStorage.clear();
  } catch (error) {
    console.log(error);
    yield put(doLogoutError());
  }
}

export { handlePostLogin, handleGetUser, handleLogout };
