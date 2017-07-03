import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  EMAIL_LOGIN_SUCCESS,
  EMAIL_LOGIN_FAIL,
  AUTH_LOG_OUT
} from '../actions/types';


export default function(state = {},action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { auth: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { auth: null };
    case GOOGLE_LOGIN_SUCCESS:
      return { auth: action.payload };
    case GOOGLE_LOGIN_FAIL:
      return { auth: null };
    case EMAIL_LOGIN_SUCCESS:
      return { auth: action.payload };
    case EMAIL_LOGIN_FAIL:
      return { auth: null };
    case AUTH_LOG_OUT:
      return { auth: null };
    default:
      return state;
  }
}
