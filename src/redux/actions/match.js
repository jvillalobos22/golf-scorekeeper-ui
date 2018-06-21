import {
  MATCHES_ADD,
  MATCHES_FETCH,
  MATCHES_FETCH_ERROR,
  GET_MATCHES,
  SELECT_MATCH,
  CREATE_MATCH,
  ADD_COURSE_TO_MATCH,
  ADD_HOLE_TO_MATCH,
  UPDATE_HOLE,
  UPDATE_MATCH
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

export { doAddMatches, doFetchMatches, doFetchMatchesError };
