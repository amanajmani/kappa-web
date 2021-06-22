const getTotalPages = (data, limit) => {

  if (data) {
    const totalProducts = data.total;

    const totalPageCountMod = totalProducts % limit;

    if (totalPageCountMod !== 0) {
      const getRoundedPageCountValue = totalProducts - totalPageCountMod;
      return (getRoundedPageCountValue / limit + 1);
    } else {
      return (totalProducts / limit);
    }
  }
}

export default getTotalPages;