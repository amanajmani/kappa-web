import React, { useState, useEffect } from 'react';

/* REDUX */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* ROUTER */
import { useParams, useHistory, useLocation } from 'react-router-dom';

/* COMPONENTS */
import Products from './components/products';

/* HELPERS */
import getTotalPages from './getTotalPages.helpers';

/* CONSTANTS */
import LIMIT from './constants/limit.constants';

/* UTILS */
import isEmpty from '../../utils/isEmpty.utils';

/* SERVICES */
import ActionCreators from '../../actions';

const ProductsContainer = ({
  categories,
  getProductsInfo,
  productsInfo,
  fetching,
  filterByPrice,
  filterByDiscount,
  sortProducts,
}) => {
  const { id, pageNo } = useParams();

  const history = useHistory();
  const location = useLocation();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (event, value) => {
    setCurrentPage(value);
    history.push(`/${id}/page/${value}`)
  };
  
  useEffect(() => {
    setTotalPages(getTotalPages(productsInfo, LIMIT))
  }, [productsInfo]);

  const validateCategoryId = (categoryId) => {
    if (!isEmpty(categories)) {
      return categories.data.some((category) => category._id === categoryId);
    }
  };

  return (
    <Products
      categoryId={id}
      page={pageNo}
      handlePagination={handlePagination}
      getProductsInfo={getProductsInfo}
      fetching={fetching}
      productsInfo={productsInfo}
      filterByPrice={filterByPrice}
      filterByDiscount={filterByDiscount}
      sortProducts={sortProducts}
      currentPage={currentPage}
      location={location}
      totalPages={totalPages}
      pageType={validateCategoryId(id) ? 'category' : 'search'}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    productsInfo: state.productsInfo.productsInfo,
    fetching: state.productsInfo.fetching,
    categories: state.categories.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);

