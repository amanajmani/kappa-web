/* CONSTANTS */
import BASE_URL from '../constants/baseURL';

/* UTILS */
import objToQueryString from '../utils/objToQueryStrings';

/* HELPERS */
import callApi from '../helpers/callApi';

// eslint-disable-next-line import/prefer-default-export
export function getAllCategories(categoriesQuery) {
  const url = `${BASE_URL}/api/v1/categories?active=true&${objToQueryString(categoriesQuery)}`;
  return callApi(url);
}
