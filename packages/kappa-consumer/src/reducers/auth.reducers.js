export default function authReducer(
  state = {
    user: {},
    fetching: false,
    message: '',
    isSignInOpen: false,
    userRegistered: false,
    verified: false,
    profileMenu: 0,
  },
  action
) {
  switch (action.type) {
    case 'LOG_IN_START':
      return {
        ...state,
        fetching: true,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        fetching: false,
        message: '',
      };
    case 'LOG_IN_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    case 'REGISTER_USER_START':
      return {
        ...state,
        fetching: true,
      };
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        fetching: false,
        message: action.payload.message,
        userRegistered: action.payload.userRegistered,
      };
    case 'REGISTER_USER_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
        userRegistered: action.payload.userRegistered,
      };

    case 'VERIFY_USER_START':
      return {
        ...state,
        fetching: true,
      };
    case 'VERIFY_USER_SUCCESS':
      return {
        ...state,
        fetching: false,
        message: action.payload.message,
        verified: action.payload.verified,
      };
    case 'VERIFY_USER_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    case 'FORGOT_PASSWORD_START':
      return {
        ...state,
        fetching: true,
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        fetching: false,
        message: action.payload.message,
      };
    case 'FORGOT_PASSWORD_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    case 'OPEN_LOGIN_MODAL':
      return {
        ...state,
        isSignInOpen: action.payload,
      };

    case 'CLEAR_AUTH_MESSAGE':
      return {
        ...state,
        message: '',
      };

    case 'SET_USER_REGISTER_FALSE':
      return {
        ...state,
        userRegistered: false,
      };

    case 'RESET_PASSWORD_START':
      return {
        ...state,
        fetching: true,
      };
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        fetching: false,
        message: action.payload.message,
        verified: action.payload.verified,
      };
    case 'RESET_PASSWORD_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
        verified: action.payload.verified,
      };

    case 'UPDATE_PROFILE_START':
      return {
        ...state,
        fetching: true,
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        fetching: false,
        message: action.payload.message,
      };
    case 'UPDATE_PROFILE_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    case 'LOGOUT_USER_START':
      return {
        ...state,
        fetching: true,
      };
    case 'LOGOUT_USER_SUCCESS':
      return {
        ...state,
        user: {},
        fetching: false,
        message: '',
      };
    case 'SET_PROFILE_MENU':
      return {
        ...state,
        fetching: false,
        message: '',
        profileMenu: action.payload,
      };

    default:
      return state;
  }
}
