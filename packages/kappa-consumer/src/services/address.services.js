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
export function getAddresses() {
  const url = `${BASE_URL}/api/v1/address`;
  const config = getConfig();
  return callApi(url, config);
}

export function addAddress(body) {
  const url = `${BASE_URL}/api/v1/address`;
  const config = getPostConfig(body);
  return callApi(url, config);
}

export function putAddress(id) {
  const url = `${BASE_URL}/api/v1/address/${id}`;
  const config = getPutConfig();
  return callApi(url, config);
}

// export function fetchUser() {
//   console.log('fetch user called');
//   const url = `${BASE_URL}/api/v1/auth/authenticate`;
//   const config = getConfig();
//   return callApi(url, config);
// }

// export function registerUser(body) {
//   const url = `${BASE_URL}/api/v1/auth/register`;
//   const config = getPostConfig(body);
//   return callApi(url, config);
// }

// export function forgotPassword(body) {
//   const url = `${BASE_URL}/api/v1/auth/reset-password`;
//   const config = getPutConfig(body);
//   return callApi(url, config);
// }
