import { call, put } from 'redux-saga/effects';
import { postLogin } from '../../api/authenticate';
import { doPostLoginSuccess, doPostLoginError } from '../actions/authenticate';

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

export { handlePostLogin };
