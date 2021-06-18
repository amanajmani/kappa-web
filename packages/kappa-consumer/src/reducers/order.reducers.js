export default function categoriesReducer(
  state = {
    order: [],
    fetching: false,
    message: '',
  },
  action
) {
  switch (action.type) {
    case 'ADD_ORDER_START':
      return {
        ...state,
        fetching: true,
      };
    case 'ADD_ORDER_SUCCESS':
      return {
        ...state,
        address: action.payload.data,
        fetching: false,
        message: '',
      };
    case 'ADD_ORDER_FAILED':
      return {
        ...state,
        message: action.payload.message,
        fetching: false,
      };
    default:
      return state;
  }
}
