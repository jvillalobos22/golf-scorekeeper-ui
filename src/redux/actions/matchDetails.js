import {
  DO_COMPLETE_MATCH,
  DO_COMPLETE_MATCH_SUCCESS,
  DO_COMPLETE_MATCH_ERROR,
  MATCH_DETAILS_ERROR_CLEAR,
  MATCH_DETAILS_SUCCESS_CLEAR
} from './actionTypes';

const doCompleteMatch = id => ({
  type: DO_COMPLETE_MATCH,
  id
});

const doCompleteMatchSuccess = id => ({
  type: DO_COMPLETE_MATCH_SUCCESS,
  id
});

const doCompleteMatchError = error => ({
  type: DO_COMPLETE_MATCH_ERROR,
  error
});

const doMatchDetailsErrorClear = () => ({
  type: MATCH_DETAILS_ERROR_CLEAR
});

const doMatchDetailsSuccessClear = () => ({
  type: MATCH_DETAILS_SUCCESS_CLEAR
});

export {
  doCompleteMatch,
  doCompleteMatchSuccess,
  doCompleteMatchError,
  doMatchDetailsErrorClear,
  doMatchDetailsSuccessClear
};
