import {
  DO_COMPLETE_MATCH_SUCCESS,
  DO_COMPLETE_MATCH_ERROR,
  MATCH_DETAILS_ERROR_CLEAR,
  MATCH_DETAILS_SUCCESS_CLEAR
} from '../actions/actionTypes';

const INITIAL_STATE = {
  updateSuccess: false,
  updateError: false
};

const matchDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DO_COMPLETE_MATCH_SUCCESS: {
      return {
        updateSuccess: true,
        updateError: ''
      };
    }
    case DO_COMPLETE_MATCH_ERROR: {
      return {
        updateSuccess: false,
        updateError: action.error
      };
    }
    case MATCH_DETAILS_ERROR_CLEAR: {
      return {
        ...state,
        updateError: false
      };
    }
    case MATCH_DETAILS_SUCCESS_CLEAR: {
      return {
        ...state,
        updateSuccess: false
      };
    }
    default:
      return state;
  }
};

export default matchDetailsReducer;
