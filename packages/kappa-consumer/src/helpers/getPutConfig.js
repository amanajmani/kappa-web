export default function getPutConfig(data = {}) {
  const token = localStorage.getItem('token');
  return {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
}
