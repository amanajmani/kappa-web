export default function authReducer(
  state = {
    user: {},
    fetching: false,
    message: '',
    isSignInOpen: false,
    userRegistered: false,
    verified: false,
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

    default:
      return state;
  }
}
