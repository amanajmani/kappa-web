/* CONSTANTS */
import BASE_URL from '../constants/baseURL';

/* UTILS */
import objToQueryString from '../utils/objToQueryStrings';

/* HELPERS */
import callApi from '../helpers/callApi';

// eslint-disable-next-line import/prefer-default-export
export function login(details) {
  console.log(details, 'details');
  const url = `${BASE_URL}/api/v1/auth/authenticate`;
  return callApi(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
