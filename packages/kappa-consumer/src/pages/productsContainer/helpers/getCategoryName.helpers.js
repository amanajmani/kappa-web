import get from '../../../utils/get.utils';

const getCategoryName = (productsInfo) => {
  return get(productsInfo, 'category.categoryName', '')
}

export default getCategoryName;
