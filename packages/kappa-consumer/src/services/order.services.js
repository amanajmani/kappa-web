/* CONSTANTS */
import BASE_URL from '../constants/baseURL';

/* UTILS */
import getPostConfig from '../helpers/getPostConfig';
import getPutConfig from '../helpers/getPutConfig';
import getDeleteConfig from '../helpers/getDeleteConfig';
import getConfig from '../helpers/getConfig';

/* HELPERS */
import callApi from '../helpers/callApi';

// eslint-disable-next-line import/prefer-default-export
// export function getAddresses() {
//   const url = `${BASE_URL}/api/v1/order`;
//   const config = getConfig();
//   return callApi(url, config);
// }

export function addOrder(body) {
  const url = `${BASE_URL}/api/v1/order`;
  const config = getPostConfig(body);
  return callApi(url, config);
}

// export function updateAddress(body, id) {
//   const url = `${BASE_URL}/api/v1/order/${id}`;
//   const config = getPutConfig(body);
//   return callApi(url, config);
// }

// export function deleteAddress(id) {
//   const url = `${BASE_URL}/api/v1/order/${id}`;
//   const config = getDeleteConfig();
//   return callApi(url, config);
// }
