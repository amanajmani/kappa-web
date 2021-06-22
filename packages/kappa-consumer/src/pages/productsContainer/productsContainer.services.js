/* CONSTANTS */
import BASE_URL from '../../constants/baseURL';

/* UTILS */
import objToQueryString from '../../utils/objToQueryStrings';

/* HELPERS */
import callApi from '../../helpers/callApi';

const PRODUCTS_BASE_URL = 'api/v1/products';

const getProductsURL = (type, query, limit, page) => {
  return `${BASE_URL}/${PRODUCTS_BASE_URL}?${type}=${query}&limit=${limit}&page=${page}`;
};

export function getProductsInfo(type, query, limit, page) {
  const url = getProductsURL(type, query, limit, page);
  return callApi(url);
}

export function filterByPrice(type, query, limit, page, minPrice, maxPrice) {
  const baseProductsURL = getProductsURL(type, query, limit, page);
  const url = `${baseProductsURL}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;
  return callApi(url);
}

export function filterByDiscount(type, query, limit, page, minDiscount) {
  const baseProductsURL = getProductsURL(type, query, limit, page);
  const url = `${baseProductsURL}&discount[gte]=${minDiscount}`;
  return callApi(url);
}

export function sortProducts(type, query, limit, page, sortBy) {
  const baseProductsURL = getProductsURL(type, query, limit, page);
  const url = `${baseProductsURL}&sort=${sortBy}`;
  return callApi(url);
}
