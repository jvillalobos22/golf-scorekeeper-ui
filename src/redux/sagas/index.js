import { takeEvery, all } from 'redux-saga/effects';
import { MATCHES_FETCH, CREATE_MATCH_SUBMIT } from '../actions/actionTypes';
import { handleFetchMatches, handleCreateMatch } from './match';

function* watchAll() {
  yield all([takeEvery(MATCHES_FETCH, handleFetchMatches)]);
  yield all([takeEvery(CREATE_MATCH_SUBMIT, handleCreateMatch)]);
}

export default watchAll;
