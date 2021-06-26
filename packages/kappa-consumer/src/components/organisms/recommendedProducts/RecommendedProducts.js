import React, { useEffect } from 'react';

/* REDUX */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Typography from '@kappa/components/src/atoms/typography';
import ProductCard from '@kappa/components/src/molecules/productCard';
import Grid from '@kappa/components/src/atoms/grid';
import Divider from '@kappa/components/src/atoms/divider';
import Loader from '@kappa/components/src/atoms/loader';
import ContentContainer from '@kappa/components/src/atoms/contentContainer';

/* READERS */
import productsReader from '../../../readers/productsList.readers';

/* HELPERS */
import getCategoryName from '../../../helpers/getCategoryName.helpers';

/* CONSTANTS */
import BASE_URL from '../../../constants/baseURL';
import RECOMMENDED_PRODUCTS_QUERY from '../../../constants/recommendedProductsQuery.constants';

/* UTILS */
import isEmpty from '../../../utils/isEmpty.utils';

// Styles
import useStyles from './recommendedProducts.styles';

/* SERVICES */
import ActionCreators from '../../../actions';

const renderImage = (images) => `${BASE_URL}/api/v1/files/${images[0]}`;

const renderProduct = (layout, categoryName) => (product) => (
  <Grid
    key={productsReader.id(product)}
    item
    lg={layout}
    md={4}
    sm={6}
    xs={12}
  >
    <ProductCard
      image={renderImage(!isEmpty(productsReader.images(product))
        && productsReader.images(product))}
      categoryName={categoryName}
      name={productsReader.name(product)}
      price={productsReader.price(product)}
      id={productsReader.id(product)}
    />
  </Grid>
);

const RecommendedProducts = ({
  title,
  data,
  getRecommendedProductsInfo,
  fetching,
  layout,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getRecommendedProductsInfo(RECOMMENDED_PRODUCTS_QUERY);
  }, []);

  if (fetching) {
    return <Loader padding />;
  }

  return (
    <div className={classes.root}>
      <Divider color="#e5e5e5" />

      <div className={classes.container}>
        <ContentContainer maxWidth="md">
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </div>
          <Grid container spacing={5} className={classes.content} justify="center">
            {productsReader.data(data)
              .map(renderProduct(layout, getCategoryName(data)))}
          </Grid>
        </ContentContainer>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.productsInfo.recommendedProductsInfo,
    fetching: state.productsInfo.recommendedProductsInfoFetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedProducts);
