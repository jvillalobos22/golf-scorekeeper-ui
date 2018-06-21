import { takeEvery, all } from 'redux-saga/effects';
import { MATCHES_FETCH } from '../actions/actionTypes';
import { handleFetchMatches } from './match';

function* watchAll() {
  yield all([takeEvery(MATCHES_FETCH, handleFetchMatches)]);
}

export default watchAll;
