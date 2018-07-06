import { takeEvery, all } from 'redux-saga/effects';
import {
  CREATE_MATCH_SUBMIT,
  DO_COMPLETE_MATCH,
  POST_LOGIN,
  MATCHES_FETCH,
  PATCH_SCORE_UPDATE
} from '../actions/actionTypes';
import {
  handleFetchMatches,
  handleCreateMatch,
  handleUpdateMatch,
  handleCompleteMatch
} from './match';
import { handlePostLogin } from './authenticate';

function* watchAll() {
  yield all([takeEvery(MATCHES_FETCH, handleFetchMatches)]);
  yield all([takeEvery(CREATE_MATCH_SUBMIT, handleCreateMatch)]);
  yield all([takeEvery(PATCH_SCORE_UPDATE, handleUpdateMatch)]);
  yield all([takeEvery(DO_COMPLETE_MATCH, handleCompleteMatch)]);
  yield all([takeEvery(POST_LOGIN, handlePostLogin)]);
}

export default watchAll;
