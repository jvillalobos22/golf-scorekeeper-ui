import { call, put } from 'redux-saga/effects';
import { postLogin, getUser } from '../../api/authenticate';
import {
  doPostLoginSuccess,
  doPostLoginError,
  doGetUserFailure,
  doGetUserSuccess
} from '../actions/authenticate';

function* handlePostLogin(action) {
  const { payload } = action;

  try {
    console.log('handlePostLogin()');
    console.log(action.payload);
    const result = yield call(postLogin, payload);
    console.log('result', result);
    yield put(doPostLoginSuccess(result));
  } catch (error) {
    yield put(doPostLoginError(error));
  }
}

function* handleGetUser() {
  try {
    console.log(handleGetUser());
    const result = yield call(getUser);
    console.log('result', result);
    if (result.user !== null) {
      yield put(doGetUserSuccess(result.user));
    } else {
      yield put(doGetUserFailure());
    }
  } catch (error) {
    yield put(doGetUserFailure());
  }
}

export { handlePostLogin, handleGetUser };
