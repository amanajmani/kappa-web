import React, { useState, useEffect } from 'react';

import clsx from 'clsx';

/* COMPONENTS */
// atoms
import Typography from '@kappa/components/src/atoms/typography';
import Grid from '@kappa/components/src/atoms/grid';
import Button from '@kappa/components/src/atoms/button';
import Paper from '@kappa/components/src/atoms/paper';
import ProductCard from '@kappa/components/src/molecules/productCard';
import Pagination from '../../../../components/atoms/pagination';

// molecules
import FiltersPanel from '../../../../components/molecules/filtersPanel';

/* READERS */
import productsReader from '../../../../readers/productsContainer.readers';

/* STYLES */
import useStyles from './productsList.styles';

/* ASSETS */
// images
import FilterListIcon from '../../../../assets/images/filterList';

/* UTILS */
import isEmpty from '../../../../utils/isEmpty.utils'

/* CONSTANTS */
import FILTER_PRODUCTS from '../../constants/filterProducts.constants';
import INITIAL_LAYOUT from '../../constants/initialLayout.constants';
import BASE_URL from '../../../../constants/baseURL';

const renderImage = (images) => {
   return `${BASE_URL}/api/v1/files/${images[0]}`
}

const renderProduct = (layout) => (product) => (
  <Grid 
    key={productsReader.id(product)}
    item 
    lg={layout.numberOfProducts} 
    md={4} 
    sm={6} 
    xs={12}
  >
    <ProductCard
      image={renderImage(!isEmpty(productsReader.images(product)) 
        && productsReader.images(product))}
      name={productsReader.name(product)}
      height={layout.height}
      price={productsReader.price(product)}
      id={productsReader.id(product)}
    />
  </Grid>
)

const ProductsList = ({
  productsInfo,
  handlePagination,
  totalPages,
  page,
  handleFilters,
  getTitle,
  pageType,
}) => {

  const classes = useStyles();

  const [isFiltersPanelVisible, setIsFiltersPanelVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  // Detect Scroll
  useEffect(() => {
    const onScroll = (e) => {
      setScrolling(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const toggleFiltersPanel = () => {
    setIsFiltersPanelVisible((prev) => !prev);
  };

  return (
    <div>
      <Paper className={classes.headerMenu} elevation={false}>
        <div className={classes.headerTitleContainer}>
          <Typography color='textPrimary' variant='h5'
            className={clsx(
              classes.title,
              scrolling > 20 && classes.fontShrink
            )}
          >
            {getTitle(productsInfo)}
          </Typography>
        </div>

        <div className={classes.filtersButtonContainer}>
          <Button
            onClick={toggleFiltersPanel}
            label={isFiltersPanelVisible ? 'Hide Filters' : 'Show Filters'}
            size='large'
            className={classes.button}
            endIcon={<FilterListIcon />}
            disableRipple
          />
        </div>
      </Paper>

      <div className={classes.contentContainer}>
        <FiltersPanel
          toggleFiltersPanel={toggleFiltersPanel}
          isFiltersPanelVisible={isFiltersPanelVisible}
          isFixed={scrolling > 20}
          handleFilters={handleFilters}
          FILTER={FILTER_PRODUCTS}
          pageType={pageType}
        />

        <div className={classes.content}>
          <Grid container spacing={3}>
            {productsReader.data(productsInfo)
              .map(renderProduct(INITIAL_LAYOUT))}
          </Grid>

          <Pagination
            className={classes.pagination}
            count={totalPages}
            page={page}
            onChange={handlePagination}
            color='primary'
          />
        </div>
      </div>

    </div>
  );
};

export default ProductsList;