export default function getDeleteConfig() {
  const token = localStorage.getItem('token');
  return {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
}
