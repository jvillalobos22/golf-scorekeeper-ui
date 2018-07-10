import { takeEvery, all } from 'redux-saga/effects';
import {
  CREATE_MATCH_SUBMIT,
  DO_COMPLETE_MATCH,
  GET_USER,
  POST_LOGIN,
  MATCHES_FETCH,
  PATCH_SCORE_UPDATE,
  LOGOUT,
  POST_SIGNUP
} from '../actions/actionTypes';
import {
  handleFetchMatches,
  handleCreateMatch,
  handleUpdateMatch,
  handleCompleteMatch
} from './match';
import {
  handlePostLogin,
  handleGetUser,
  handleLogout,
  handleSignup
} from './authenticate';

function* watchAll() {
  yield all([takeEvery(MATCHES_FETCH, handleFetchMatches)]);
  yield all([takeEvery(CREATE_MATCH_SUBMIT, handleCreateMatch)]);
  yield all([takeEvery(PATCH_SCORE_UPDATE, handleUpdateMatch)]);
  yield all([takeEvery(DO_COMPLETE_MATCH, handleCompleteMatch)]);
  yield all([takeEvery(POST_LOGIN, handlePostLogin)]);
  yield all([takeEvery(GET_USER, handleGetUser)]);
  yield all([takeEvery(LOGOUT, handleLogout)]);
  yield all([takeEvery(POST_SIGNUP, handleSignup)]);
}

export default watchAll;
