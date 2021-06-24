import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* STYLES */
import useStyles from './products.styles';

/* COMPONENTS */
import Loader from '@kappa/components/src/atoms/loader';
import NoProducts from '../noProducts';
import ProductsList from '../productsList';

/* UTILS */
import isEmpty from '../../../../utils/isEmpty.utils';
import get from '../../../../utils/get.utils';

/* READERS */
import productsReader from '../../../../readers/productsContainer.readers';

/* CONSTANTS */
import LIMIT from '../../constants/limit.constants';

const getTitle = (info) => {
  return `${get(info, 'category.categoryName')} Products (${info.total})`;
};

const Products = ({
  categoryId,
  page,
  getProductsInfo,
  handlePagination,
  productsInfo,
  fetching,
  filterByPrice,
  filterByDiscount,
  sortProducts,
  currentPage,
  location,
  totalPages,
  pageType,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProductsInfo(pageType, categoryId, LIMIT, page);
  }, [pageType, currentPage, location.pathname]);

  const handleFilters = (type, value, pageType) => () => {
    if (type === 'price') {
      const { min, max } = value;
      filterByPrice(pageType, categoryId, LIMIT, page, min, max);
    }
    if (type === 'discount') {
      filterByDiscount(pageType, categoryId, LIMIT, page, value);
    }
    if (type === 'sort') {
      sortProducts(pageType, categoryId, LIMIT, page, value);
    }
  };

  if (fetching) {
    return <Loader padding />;
  }

  if (isEmpty(productsReader.data(productsInfo))) {
    return <NoProducts />;
  }

  return (
    <div className={classes.root}>
      <ProductsList
        productsInfo={productsInfo}
        handlePagination={handlePagination}
        page={parseInt(page, 10) ? parseInt(page, 10) : currentPage}
        totalPages={totalPages}
        handleFilters={handleFilters}
        getTitle={getTitle}
        pageType={pageType}
      />
    </div>
  );
};

Products.propTypes = {
  categoryId: PropTypes.string,
  page: PropTypes.number,
  getProductsInfo: PropTypes.func,
  handlePagination: PropTypes.func,
  productsInfo: PropTypes.object,
  fetching: PropTypes.bool,
  filterByPrice: PropTypes.func,
  filterByDiscount: PropTypes.func,
  sortProducts: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

Products.defaultProps = {
  categoryId: '',
  page: 0,
};

export default Products;
