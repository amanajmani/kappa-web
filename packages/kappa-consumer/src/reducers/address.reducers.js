export default function authReducer(
  state = {
    address: [],
    fetching: false,
    message: '',
  },
  action
) {
  switch (action.type) {
    case 'GET_ADDRESS_START':
      return {
        ...state,
        fetching: true,
      };
    case 'GET_ADDRESS_SUCCESS':
      return {
        ...state,
        address: action.payload.shippingAddress,
        fetching: false,
        message: '',
      };
    case 'GET_ADDRESS_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    case 'ADD_ADDRESS_START':
      return {
        ...state,
        fetching: true,
      };
    case 'ADD_ADDRESS_SUCCESS':
      return {
        ...state,
        address: action.payload.shippingAddress,
        fetching: false,
        message: '',
      };
    case 'ADD_ADDRESS_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    case 'UPDATE_ADDRESS_START':
      return {
        ...state,
        fetching: true,
      };
    case 'UPDATE_ADDRESS_SUCCESS':
      return {
        ...state,
        address: action.payload.shippingAddress,
        fetching: false,
        message: '',
      };
    case 'UPDATE_ADDRESS_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    case 'DELETE_ADDRESS_START':
      return {
        ...state,
        fetching: true,
      };
    case 'DELETE_ADDRESS_SUCCESS':
      return {
        ...state,
        address: action.payload.shippingAddress,
        fetching: false,
        message: '',
      };
    case 'DELETE_ADDRESS_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };

    default:
      return state;
  }
}
