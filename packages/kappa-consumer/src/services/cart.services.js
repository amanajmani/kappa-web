/* CONSTANTS */
import BASE_URL from '../constants/baseURL';

/* UTILS */
import getPostConfig from '../helpers/getPostConfig';
import getPutConfig from '../helpers/getPutConfig';
import getDeleteConfig from '../helpers/getDeleteConfig';
import getConfig from '../helpers/getConfig';

/* HELPERS */
import callApi from '../helpers/callApi';

export function getCart() {
  const url = `${BASE_URL}/api/v1/cart/user`;
  const config = getConfig();
  return callApi(url, config);
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
  const url = `${BASE_URL}/api/v1/cart/item/${id}`;
  const config = getPutConfig();
  return callApi(url, config);
}
