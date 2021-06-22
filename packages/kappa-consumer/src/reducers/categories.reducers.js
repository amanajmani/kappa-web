export default function categoriesReducer(state = {
  categories: [],
  fetching: true,
}, action) {
  switch (action.type) {
    case 'FETCHING_CATEGORIES':
      return {
        ...state,
        fetching: true,
      };
    case 'FETCHED_CATEGORIES':
      return {
        ...state,
        categories: action.payload.data,
        fetching: false,
      };
    default:
      return state;
  }
}
