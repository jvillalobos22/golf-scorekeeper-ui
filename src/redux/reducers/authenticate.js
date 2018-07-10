import {
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGIN_ERROR_CLEAR,
  GET_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_ERROR_CLEAR,
  GET_USER_FAILURE
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: false,
  redirectToLogin: false,
  xAuth: '',
  user_id: null,
  user_display_name: '',
  login_success: false,
  login_error: '',
  logout_error: false
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
        login_error: '',
        redirectToLogin: false,
        logout_error: false
      };
    }
    case GET_USER_SUCCESS: {
      return {
        loggedIn: true,
        xAuth: action.payload.xAuth,
        user_id: action.payload.user._id,
        user_display_name: action.payload.user.displayName,
        login_success: true,
        login_error: '',
        redirectToLogin: false,
        logout_error: false
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        redirectToLogin: true
      };
    }
    case POST_LOGIN_ERROR: {
      return {
        loggedIn: false,
        user_id: null,
        user_display_name: '',
        login_success: false,
        login_error: action.error,
        redirectToLogin: true,
        logout_error: false
      };
    }
    case POST_LOGIN_ERROR_CLEAR: {
      return {
        ...state,
        login_error: '',
        redirectToLogin: false
      };
    }
    case LOGOUT_SUCCESS: {
      return { ...INITIAL_STATE, redirectToLogin: true };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logout_error: true
      };
    }
    case LOGOUT_ERROR_CLEAR: {
      return {
        ...state,
        logout_error: false
      };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
