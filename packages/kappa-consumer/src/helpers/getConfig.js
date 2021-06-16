export default function getConfig() {
  const token = localStorage.getItem('token');
  return {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  };
}
