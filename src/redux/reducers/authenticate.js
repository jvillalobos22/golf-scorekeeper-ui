import {
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGIN_ERROR_CLEAR,
  GET_USER_SUCCESS
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: false,
  xAuth: '',
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
        xAuth: action.payload.xAuth,
        user_id: action.payload.user._id,
        user_display_name: action.payload.user.displayName,
        login_success: true,
        login_error: ''
      };
    }
    case GET_USER_SUCCESS: {
      return {
        loggedIn: true,
        xAuth: action.payload.xAuth,
        user_id: action.payload.user._id,
        user_display_name: action.payload.user.displayName,
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
