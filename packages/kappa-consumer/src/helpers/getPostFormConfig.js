export default function getPostFormConfig(data) {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));

  return {
    method: 'POST',
    body: formData,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: token,
    },
  };
}
