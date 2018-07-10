import {
  CREATE_MATCH_SUCCESS,
  CREATE_MATCH_ERROR,
  CREATE_MATCH_CLEAR,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';

const INITIAL_STATE = {
  createMatchError: false,
  createMatchSuccess: false,
  createdMatchId: null
};

const createMatchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_MATCH_SUCCESS: {
      return {
        createMatchSuccess: true,
        createMatchError: false,
        createdMatchId: action.match._id
      };
    }
    case CREATE_MATCH_ERROR: {
      return {
        createMatchError: true,
        createMatchSuccess: false
      };
    }
    case CREATE_MATCH_CLEAR: {
      return INITIAL_STATE;
    }
    case LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

export default createMatchReducer;
