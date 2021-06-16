/* eslint-disable import/prefer-default-export */
export function authReducer(
  state = {
    user: {},
    fetching: true,
  },
  action
) {
  switch (action.type) {
    case 'FETCHING_USER':
      return {
        ...state,
        fetching: true,
      };
    case 'FETCHED_USER':
      return {
        ...state,
        products: action.payload.data,
        fetching: false,
      };
    default:
      return state;
  }
}
