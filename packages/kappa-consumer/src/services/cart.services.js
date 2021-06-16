/* CONSTANTS */
import BASE_URL from '../constants/baseURL';

/* UTILS */
import getPostConfig from '../helpers/getPostConfig';
import getPutConfig from '../helpers/getPutConfig';
import getDeleteConfig from '../helpers/getDeleteConfig';

/* HELPERS */
import callApi from '../helpers/callApi';

export function getCart(userId) {
  const url = `${BASE_URL}/api/v1/cart/${userId}`;
  return callApi(url);
}

export function addToCart(cartParams) {
  const url = `${BASE_URL}/api/v1/cart`;
  const config = getPostConfig(cartParams);
  return callApi(url, config);
}

export function updateCart(cartParams) {
  const url = `${BASE_URL}/api/v1/cart`;
  const config = getPutConfig(cartParams);
  return callApi(url, config);
}

export function deleteProductFromCart(id) {
  const url = `${BASE_URL}/api/v1/cart/${id}`;
  const config = getPutConfig();
  return callApi(url, config);
}
