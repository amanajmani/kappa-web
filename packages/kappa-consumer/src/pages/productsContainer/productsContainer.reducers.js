export default function productsListReducer(state = {
  productsInfo: {},
  fetching: true,
}, action) {
  switch (action.type) {
    case 'FETCHING_PRODUCTS_INFO':
      return {
        ...state,
        fetching: true,
      };
    case 'FETCHED_PRODUCTS_INFO':
      return {
        ...state,
        productsInfo: action.payload,
        fetching: false,
      };
    case 'FILTER_BY_PRICE':
      return {
        ...state,
        fetching: true,
      };
    case 'FILTERED_BY_PRICE':
      return {
        ...state,
        productsInfo: action.payload,
        fetching: false,
      };
    case 'FILTER_BY_DISCOUNT':
      return {
        ...state,
        fetching: true,
      };
    case 'FILTERED_BY_DICSOUNT':
      return {
        ...state,
        productsInfo: action.payload,
        fetching: false,
      };
    case 'SORT_PRODUCTS':
      return {
        ...state,
        fetching: true,
      };
    case 'SORTED_PRODUCTS':
      return {
        ...state,
        productsInfo: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
}
