import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';

// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';
import Grid from '@kappa/components/src/atoms/grid';
import Button from '@kappa/components/src/atoms/button';
import ContentContainer from '@kappa/components/src/atoms/contentContainer';
import Paper from '@kappa/components/src/atoms/paper';
import Menu from '@kappa/components/src/atoms/menu';

import MenuItem from '@kappa/components/src/atoms/menuItem';
import IconButton from '@kappa/components/src/atoms/iconButton';
// import UserReader from '../../readers/User';
import ProductCard from '@kappa/components/src/molecules/productCard';
import Loader from '@kappa/components/src/atoms/loader';
import Pagination from '../../components/atoms/pagination';

// molecules
import FiltersPanel from '../../components/molecules/filtersPanel';

// organisms
import RecommendedProducts from '../../components/organisms/recommendedProducts';

/* STYLES */
import useStyles from './productsList.styles';

/* ASSETS */
// images
import LargeLayoutIcon from '../../assets/images/largeLayout';
import SmallLayoutIcon from '../../assets/images/smallLayout';
import FilterListIcon from '../../assets/images/filterList';
import ExpandMoreIcon from '../../assets/images/expandMore';

/* CONSTANTS */
import SORT_PRODUCTS from './sortProducts.constants';
import BASE_URL from '../../constants/baseURL';

/* SERVICES */
import ActionCreators from '../../actions';

/* UTILS */
import isEmpty from '../../utils/isEmpty.utils';

const ProductsList = (props) => {
  const classes = useStyles();

  const { products, fetching, match, getProductsList, categories } = props;

  const [page, setPage] = useState(1);
  const [isFiltersPanelVisible, setIsFiltersPanelVisible] = useState(false);
  const [productsListParams, setProductsListParams] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [sortPanelPosition, setSortPanelPosition] = React.useState(null);
  const [layout, setLayout] = React.useState({
    height: 350,
    numberOfProducts: 3,
  });
  const [totalPages, setTotalPages] = useState(1);

  // responsive
  const theme = useTheme();
  const isXtraSmall = useMediaQuery(theme.breakpoints.only('xs'));

  const validateId = (id) => {
    if (!isEmpty(categories)) {
      return categories.data.some((category) => category._id === id);
    }
  };

  const setParams = () => {
    if (validateId(match.params.id)) {
      setProductsListParams({
        category: match.params.id,
        page,
        limit: 5,
      });
    } else {
      setProductsListParams({
        search: match.params.id,
        page,
        limit: 5,
      });
    }
  };

  useEffect(() => {
    setParams();
  }, [page]);

  useEffect(() => {
    setPage(1);
    setParams();
  }, [match.params.id]);

  // Products API Call
  useEffect(() => {
    if (productsListParams) {
      getProductsList(productsListParams);
    }
  }, [productsListParams, getProductsList]);

  useEffect(() => {
    const limit = 5;
    if (!isEmpty(products)) {
      const productsMod = products.total % limit;
      if (productsMod !== 0) {
        const productsRes = products.total - productsMod;
        setTotalPages(productsRes / limit + 1);
      } else {
        setTotalPages(products.total / limit);
      }
    }
  }, [products]);

  useEffect(() => {
    const onScroll = (e) => {
      setScrolling(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const toggleFiltersPanel = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsFiltersPanelVisible(open);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const openSort = (event) => {
    setSortPanelPosition(event.currentTarget);
  };

  const closeSort = () => {
    setSortPanelPosition(null);
  };

  const handleLayout = (height, numberOfProducts) => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      height,
      numberOfProducts,
    }));
  };

  return (
    <div className={classes.root}>
      {isEmpty(products) ? (
        fetching ? (
          <Loader padding />
        ) : (
          <Typography style={{ margin: 50, textAlign: 'center' }}>
            No Products Yet
          </Typography>
        )
      ) : (
        <>
          <ContentContainer>
            <Paper className={classes.headerMenu} elevation={false}>
              <div className={classes.headerTitleContainer}>
                <Typography
                  color='textPrimary'
                  variant='h4'
                  className={clsx(
                    classes.title,
                    scrolling > 20 && classes.fontShrink
                  )}
                >
                  {products.category
                    ? `${products.category.categoryName} Products (${products.total})`
                    : `Your Searched Products (${products.total})`}
                </Typography>
              </div>
              <div className={classes.filtersButtonContainer}>
                <Button
                  onClick={toggleFiltersPanel(true)}
                  label='Show FIlters'
                  size='large'
                  className={classes.button}
                  endIcon={<FilterListIcon />}
                />
                <Button
                  onClick={openSort}
                  label='Sort By'
                  size='large'
                  className={classes.button}
                  endIcon={<ExpandMoreIcon />}
                />
                <IconButton onClick={() => handleLayout(400, 4)}>
                  <LargeLayoutIcon />
                </IconButton>
                <IconButton onClick={() => handleLayout(300, 3)}>
                  <SmallLayoutIcon />
                </IconButton>
              </div>
            </Paper>

            <Menu
              anchorEl={sortPanelPosition}
              keepMounted
              open={Boolean(sortPanelPosition)}
              onClose={closeSort}
              className={classes.menu}
              PaperProps={{
                style: {
                  width: isXtraSmall ? '100%' : 192,
                  borderRadius: '0 0 27px 27px',
                },
              }}
            >
              {SORT_PRODUCTS.map((text) => (
                <MenuItem onClick={closeSort} className={classes.menuItem}>
                  {text}
                </MenuItem>
              ))}
            </Menu>

            <div className={classes.content}>
              <Grid container spacing={3}>
                {products.data.map((product) => (
                  <Grid
                    item
                    lg={layout.numberOfProducts}
                    md={4}
                    sm={6}
                    xs={12}
                    key={product._id}
                  >
                    <ProductCard
                      image={
                        product.images.length !== 0 &&
                        `${BASE_URL}/api/v1/files/${
                          product.images.length !== 0 && product.images[0]
                        }`
                      }
                      name={product.title}
                      height={layout.height}
                      price={product.price}
                      id={product._id}
                    />
                  </Grid>
                ))}
              </Grid>
              <Pagination
                className={classes.pagination}
                count={totalPages}
                page={page}
                onChange={handlePagination}
                color='primary'
              />
            </div>
          </ContentContainer>

          <FiltersPanel
            isFiltersPanelVisible={isFiltersPanelVisible}
            toggleFiltersPanel={toggleFiltersPanel}
          />

          {/* <RecommendedProducts title="You May Also Like" /> */}
        </>
      )}
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    products: state.productsList.productsList,
    fetching: state.productsList.fetching,
    categories: state.categories.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

{
  /* {UserReader.userName({

            })} */
}
