import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* COMPONENTS */
import Navbar from '@kappa/components/src/organisms/navbar';
import Loader from '@kappa/components/src/atoms/loader';
import ConsumerNavbar from '../../components/organisms/consumerNavbar';

/* SERVICES */
import ActionCreators from '../../actions';

import Footer from '../../components/organisms/footer';

// styles
import useStyles from './primaryLayout.styles';

const PrimaryLayout = ({
  children,
  getAllCategories,
  fetching,
  categories,
}) => {
  const classes = useStyles();
  const [categoriesQuery, setCategoriesQuery] = useState({
    page: 1,
    limit: 100,
  });

  useEffect(() => {
    getAllCategories(categoriesQuery);
  }, [categoriesQuery, getAllCategories]);

  return (
    <div className={classes.root}>
      {!fetching && categories ? (
        <>
          <Navbar>
            <ConsumerNavbar categories={categories} />
          </Navbar>
          <div className={classes.content}>
            <main>{children}</main>
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    fetching: state.categories.fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);
