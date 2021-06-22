// actions
import * as productsServices from './productsContainer.services';

const handleError = (error) => console.log(error);

export function getProductsInfo(...params) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_PRODUCTS_INFO',
    });

    return productsServices.getProductsInfo(...params).then((res) => {
      dispatch({
        type: 'FETCHED_PRODUCTS_INFO',
        payload: res,
      });
    }, handleError);
  };
}

export function filterByPrice(...params) {
  return (dispatch) => {
    dispatch({
      type: 'FILTER_BY_PRICE',
    });

    return productsServices.filterByPrice(...params).then((res) => {
      dispatch({
        type: 'FILTERED_BY_PRICE',
        payload: res,
      });
    }, handleError);
  };
}

export function filterByDiscount(...params) {
  return (dispatch) => {
    dispatch({
      type: 'FILTER_BY_DISCOUNT',
    });

    return productsServices.filterByDiscount(...params).then((res) => {
      dispatch({
        type: 'FILTERED_BY_DICSOUNT',
        payload: res,
      });
    }, handleError);
  };
}

export function sortProducts(...params) {
  return (dispatch) => {
    dispatch({
      type: 'SORT_PRODUCTS',
    });

    return productsServices.sortProducts(...params).then((res) => {
      dispatch({
        type: 'SORTED_PRODUCTS',
        payload: res,
      });
    }, handleError);
  };
}