/* CONSTANTS */
import BASE_URL from '../constants/baseURL';

/* UTILS */
import getPostConfig from '../helpers/getPostConfig';
import getPutConfig from '../helpers/getPutConfig';
import getDeleteConfig from '../helpers/getDeleteConfig';
import getConfig from '../helpers/getConfig';

/* HELPERS */
import callApi from '../helpers/callApi';

export function loginUser(body) {
  const url = `${BASE_URL}/api/v1/auth/authenticate`;
  const config = getPostConfig(body);
  return callApi(url, config);
}

export function fetchUser() {
  console.log('fetch user called');
  const url = `${BASE_URL}/api/v1/auth/authenticate`;
  const config = getConfig();
  return callApi(url, config);
}

export function registerUser(body) {
  const url = `${BASE_URL}/api/v1/auth/register`;
  const config = getPostConfig(body);
  return callApi(url, config);
}

export function verifyUser(verificationCode) {
  const url = `${BASE_URL}/api/v1/auth/verify-now/${verificationCode}`;
  const config = getConfig();
  return callApi(url, config);
}

export function forgotPassword(body) {
  const url = `${BASE_URL}/api/v1/auth/reset-password`;
  const config = getPutConfig(body);
  return callApi(url, config);
}

// export function updateCart(cartParams) {
//   const url = `${BASE_URL}/api/v1/cart`;
//   const config = getPutConfig(cartParams);
//   return callApi(url, config);
// }

// export function deleteProductFromCart(id) {
//   const url = `${BASE_URL}/api/v1/cart/${id}`;
//   const config = getPutConfig();
//   return callApi(url, config);
// }
