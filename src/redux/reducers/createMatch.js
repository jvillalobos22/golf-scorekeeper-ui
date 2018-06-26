import {
  CREATE_MATCH_SUCCESS,
  CREATE_MATCH_ERROR
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
    default:
      return state;
  }
};

export default createMatchReducer;
