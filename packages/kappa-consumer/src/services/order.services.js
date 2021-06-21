/* CONSTANTS */
import BASE_URL from '../constants/baseURL';

/* UTILS */
import getPostConfig from '../helpers/getPostConfig';
import getPutConfig from '../helpers/getPutConfig';
import getDeleteConfig from '../helpers/getDeleteConfig';
import getConfig from '../helpers/getConfig';

/* HELPERS */
import callApi from '../helpers/callApi';

export function addOrder(body) {
  const url = `${BASE_URL}/api/v1/order`;
  const config = getPostConfig(body);
  return callApi(url, config);
}

export function getOrders() {
  const url = `${BASE_URL}/api/v1/order/myorders`;
  const config = getConfig();
  return callApi(url, config);
}
