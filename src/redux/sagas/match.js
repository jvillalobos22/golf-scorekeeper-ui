import { call, put } from 'redux-saga/effects';
import {
  doAddMatches,
  doFetchMatchesError,
  doMatchCreateSuccess,
  doMatchCreateError
} from '../actions/match';
import { fetchMatches, postMatch } from '../../api/match';

function* handleFetchMatches(action) {
  const { query } = action;

  try {
    const result = yield call(fetchMatches, query);
    yield put(doAddMatches(result.matches));
  } catch (error) {
    yield put(doFetchMatchesError(error));
  }
}

function* handleCreateMatch(action) {
  const { match } = action;

  try {
    const result = yield call(postMatch, match);
    // Call Success Action
    console.log('RESULT: ', result);
    yield put(doMatchCreateSuccess(result));
  } catch (error) {
    // Call Error Action
    yield put(doMatchCreateError(error));
  }
}

export { handleFetchMatches, handleCreateMatch };
