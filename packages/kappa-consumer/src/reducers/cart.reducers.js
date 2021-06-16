export default function cartReducer(
  state = {
    cart: [],
    fetching: false,
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
        cart: action.payload.data.items,
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
        cart: action.payload.data.items,
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
        cart: action.payload.data.items,
      };
    default:
      return state;
  }
}
