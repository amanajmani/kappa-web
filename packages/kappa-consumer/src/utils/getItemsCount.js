const getItemsCount = (arr) => {
  return arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.quantity;
  }, 0);
};

export default getItemsCount;
