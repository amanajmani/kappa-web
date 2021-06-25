const getTime = (dateStr) => {
  let d = new Date(dateStr);
  return d.toLocaleString();
};

export default getTime;
