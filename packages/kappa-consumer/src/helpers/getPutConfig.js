export default function getPutConfig(data = {}) {
  return {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      // Authorization: basicAuth,
    },
  };
}
