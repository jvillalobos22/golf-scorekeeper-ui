import { takeEvery, all } from 'redux-saga/effects';
import {
  MATCHES_FETCH,
  CREATE_MATCH_SUBMIT,
  PATCH_SCORE_UPDATE
} from '../actions/actionTypes';
import {
  handleFetchMatches,
  handleCreateMatch,
  handleUpdateMatch
} from './match';

function* watchAll() {
  yield all([takeEvery(MATCHES_FETCH, handleFetchMatches)]);
  yield all([takeEvery(CREATE_MATCH_SUBMIT, handleCreateMatch)]);
  yield all([takeEvery(PATCH_SCORE_UPDATE, handleUpdateMatch)]);
}

export default watchAll;
