const getPrice = (price, discount) => {
  let res = (price / 100) * discount;
  return price - res;
};

export default getPrice;
