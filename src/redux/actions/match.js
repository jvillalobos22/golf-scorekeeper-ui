import {
  CREATE_MATCH_SUBMIT,
  CREATE_MATCH_SUCCESS,
  CREATE_MATCH_ERROR,
  MATCHES_ADD,
  MATCHES_FETCH,
  MATCHES_FETCH_ERROR
} from './actionTypes';

const doAddMatches = matches => ({
  type: MATCHES_ADD,
  matches
});

const doFetchMatches = query => ({
  type: MATCHES_FETCH,
  query
});

const doFetchMatchesError = error => ({
  type: MATCHES_FETCH_ERROR,
  error
});

const doMatchCreate = match => ({
  type: CREATE_MATCH_SUBMIT,
  match
});

const doMatchCreateSuccess = match => ({
  type: CREATE_MATCH_SUCCESS,
  match
});

const doMatchCreateError = error => ({
  type: CREATE_MATCH_ERROR,
  error
});

export {
  doAddMatches,
  doFetchMatches,
  doFetchMatchesError,
  doMatchCreate,
  doMatchCreateSuccess,
  doMatchCreateError
};
