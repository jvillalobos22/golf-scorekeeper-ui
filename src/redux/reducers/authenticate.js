import {
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGIN_ERROR_CLEAR
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: false,
  user_id: null,
  user_display_name: '',
  login_success: false,
  login_error: ''
};

const authenticationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_LOGIN_SUCCESS: {
      return {
        loggedIn: true,
        user_id: action.payload._id,
        user_display_name: action.payload.displayName,
        login_success: true,
        login_error: ''
      };
    }
    case POST_LOGIN_ERROR: {
      return {
        loggedIn: false,
        user_id: null,
        user_display_name: '',
        login_success: false,
        login_error: action.error
      };
    }
    case POST_LOGIN_ERROR_CLEAR: {
      return {
        ...state,
        login_error: ''
      };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
