import { MATCHES_ADD, MATCHES_FETCH, MATCHES_FETCH_ERROR } from './actionTypes';

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

export { doAddMatches, doFetchMatches, doFetchMatchesError };
