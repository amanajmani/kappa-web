export default function authReducer(
  state = {
    user: {},
    fetching: false,
    message: '',
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
      };
    case 'REGISTER_USER_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
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

    default:
      return state;
  }
}
