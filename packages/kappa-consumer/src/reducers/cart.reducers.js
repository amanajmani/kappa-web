export default function cartReducer(
  state = {
    cart: [],
    fetching: true,
    updatedCart: [],
  },
  action
) {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART':
      return {
        ...state,
        fetching: true,
      };
    case 'ADDED_PRODUCT_TO_CART':
      return {
        ...state,
        fetching: false,
      };
    case 'FETCHING_CART':
      return {
        ...state,
        fetching: true,
      };
    case 'FETCHED_CART':
      return {
        ...state,
        cart: action.payload.data,
        fetching: false,
      };

    case 'UPDATE_PRODUCT_IN_CART':
      return {
        ...state,
        fetching: true,
      };
    case 'UPDATED_PRODUCT_IN_CART':
      return {
        ...state,
        fetching: false,
        updatedCart: action.payload,
      };

    case 'DELETE_PRODUCT_FROM_CART':
      return {
        ...state,
        fetching: true,
      };
    case 'DELETED_PRODUCT_FROM_CART':
      return {
        ...state,
        fetching: false,
        updatedCart: action.payload,
      };
    default:
      return state;
  }
}
