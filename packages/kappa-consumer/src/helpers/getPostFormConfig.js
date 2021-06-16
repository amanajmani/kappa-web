export default function getPostFormConfig(data) {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));

  //   for (var value of formData.values()) {
  //     console.log('wdok', value);
  //  }
  return {
    method: 'POST',
    body: formData,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: token,
    },
  };
}
