export default function getPostConfig(data = {}) {
  const token = localStorage.getItem('token');
  return {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
}
