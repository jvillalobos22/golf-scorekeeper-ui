import {
  STORE_DB_SYNC,
  PATCH_SCORE_UPDATE_SUCCESS,
  PATCH_SCORE_UPDATE_ERROR,
  PATCH_SCORE_UPDATE_ERROR_CLEAR,
  PATCH_SCORE_UPDATE_SUCCESS_CLEAR
} from '../actions/actionTypes';

const INITIAL_STATE = {
  storeInSync: true,
  updateScoreSuccess: false,
  updateScoreError: false
};

const playMatchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_DB_SYNC: {
      return {
        ...state,
        storeInSync: action.sync
      };
    }
    case PATCH_SCORE_UPDATE_SUCCESS: {
      return {
        storeInSync: true,
        updateScoreSuccess: true,
        updateScoreError: ''
      };
    }
    case PATCH_SCORE_UPDATE_ERROR: {
      return {
        ...state,
        updateScoreSuccess: false,
        updateScoreError: action.error
      };
    }
    case PATCH_SCORE_UPDATE_ERROR_CLEAR: {
      return {
        ...state,
        updateScoreError: false
      };
    }
    case PATCH_SCORE_UPDATE_SUCCESS_CLEAR: {
      return {
        ...state,
        updateScoreSuccess: false
      };
    }
    default:
      return state;
  }
};

export default playMatchReducer;
