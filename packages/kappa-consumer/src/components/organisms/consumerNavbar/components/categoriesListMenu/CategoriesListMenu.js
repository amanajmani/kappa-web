import React from 'react';
/* REDUX */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import List from '@kappa/components/src/atoms/list';

/* READERS */
import productsReader from '../../../../../readers/productsList.readers';

/* COMPONENTS */
import Paper from '@kappa/components/src/atoms/paper';
import ProductCard from '@kappa/components/src/molecules/productCard';
import Grid from '@kappa/components/src/atoms/grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import categoriesReaders from '../../../../../readers/categories.readers'
import useStyles from './categoriesList.styles';

/* UTILS */
import isEmpty from '../../../../../utils/isEmpty.utils';
import BASE_URL from '../../../../../constants/baseURL';

/* SERVICES */
import ActionCreators from '../../../../../actions';

const renderImage = (images) => {
  return `${BASE_URL}/api/v1/files/${images[0]}`
}

const renderProduct = (leaveMenu) => (product, index) => (
  <Grid 
    key={productsReader.id(product)}
    item
    lg={3} 
    md={4} 
    sm={6} 
    xs={12}
    onClick={leaveMenu}
  >
    <ProductCard
      image={renderImage(!isEmpty(productsReader.images(product)) 
        && productsReader.images(product))}
      name={productsReader.name(product)}
      price={productsReader.price(product)}
      id={productsReader.id(product)}
      headerTitle={index === 0 ? 'Featured' : 'New'}
      headerDescription={index === 0 ? 'Discover' : 'Discover Our Products'}
    />
  </Grid>
)

const CategoriesListMenu = ({
  navbarProducts,
  categories,
  enterMenu,
  leaveMenu,
  open,
}) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={1}
      style={{
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'all .2s ease-in-out',
      }}
      onMouseEnter={enterMenu}
      onMouseLeave={leaveMenu}
      className={classes.menuPanel}
    >
      <List
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        {categoriesReaders.data(categories).map((category, i) => (
          <ListItem
            key={i}
            component={Link}
            to={`/${categoriesReaders.id(category)}/page/${1}`}
            onClick={leaveMenu}
            className={classes.list}
          >
            <ListItemText primary={categoriesReaders.categoryName(category)} />
          </ListItem>
        ))}
      </List>
      <div style={{ flex: 3 }}>
        <Grid
          container
          spacing={5}
          className={classes.content}
          justify='center'
        >
          {!isEmpty(productsReader.data(navbarProducts)) &&
            productsReader
              .data(navbarProducts)
              .slice(0, 2)
              .map(renderProduct(leaveMenu))}
        </Grid>
      </div>
    </Paper>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    navbarProducts: state.productsInfo.navbarProducts,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListMenu);
