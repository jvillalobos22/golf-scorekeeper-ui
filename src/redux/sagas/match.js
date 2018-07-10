import { call, put } from 'redux-saga/effects';
import {
  doAddMatches,
  doFetchMatchesError,
  doMatchCreateSuccess,
  doMatchCreateError
} from '../actions/match';
import {
  doCompleteMatchSuccess,
  doCompleteMatchError
} from '../actions/matchDetails';
import {
  doPatchScoreUpdateSuccess,
  doPatchScoreUpdateError
} from '../actions/playMatch';
import {
  fetchMatches,
  postMatch,
  patchScoreUpdate,
  patchCompletedMatch
} from '../../api/match';

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
  try {
    const result = yield call(postMatch, action.payload);
    yield put(doMatchCreateSuccess(result));
  } catch (error) {
    yield put(doMatchCreateError(error));
  }
}

function* handleUpdateMatch(action) {
  try {
    const result = yield call(patchScoreUpdate, action.payload);
    yield put(doPatchScoreUpdateSuccess(result.match));
  } catch (error) {
    yield put(doPatchScoreUpdateError(error));
  }
}

function* handleCompleteMatch(action) {
  try {
    const result = yield call(patchCompletedMatch, action.payload);
    yield put(doCompleteMatchSuccess(result.match._id));
  } catch (error) {
    yield put(doCompleteMatchError(error));
  }
}

export {
  handleFetchMatches,
  handleCreateMatch,
  handleUpdateMatch,
  handleCompleteMatch
};
