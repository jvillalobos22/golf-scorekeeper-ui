import { call, put } from 'redux-saga/effects';
import { doAddMatches, doFetchMatchesError } from '../actions/match';
import { fetchMatches } from '../../api/match';

function* handleFetchMatches(action) {
  const { query } = action;

  try {
    const result = yield call(fetchMatches, query);
    console.log(result);
    yield put(doAddMatches(result.matches));
  } catch (error) {
    yield put(doFetchMatchesError(error));
  }
}

export { handleFetchMatches };
