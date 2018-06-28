import { call, put } from 'redux-saga/effects';
import {
  doAddMatches,
  doFetchMatchesError,
  doMatchCreateSuccess,
  doMatchCreateError
} from '../actions/match';
import {
  doPatchScoreUpdateSuccess,
  doPatchScoreUpdateError
} from '../actions/playMatch';
import { fetchMatches, postMatch, patchScoreUpdate } from '../../api/match';

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

function* handleUpdateMatch(action) {
  console.log('handleUpdateMatch()');
  console.log(action);
  try {
    const result = yield call(patchScoreUpdate, action.payload);
    console.log('RESULT: ', result);
    yield put(doPatchScoreUpdateSuccess(result.match));
  } catch (error) {
    yield put(doPatchScoreUpdateError(error));
  }
}
export { handleFetchMatches, handleCreateMatch, handleUpdateMatch };
