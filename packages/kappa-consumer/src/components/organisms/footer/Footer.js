import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter, useHistory } from 'react-router-dom';

// Icons
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Reddit as RedditIcon,
  Twitter as TwitterIcon,
  Pinterest as PinterestIcon,
} from '@material-ui/icons';

// Styles - Responsible for Responsiveness
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Button from '@kappa/components/src/atoms/button';

// Components
import Typography from '@kappa/components/src/atoms/typography';
import Divider from '@kappa/components/src/atoms/divider';
import Container from '@kappa/components/src/atoms/container';
import Box from '@kappa/components/src/atoms/box';
import Grid from '@kappa/components/src/atoms/grid';

// Styles
import useStyles from './footer.styles';

import ActionCreators from '../../../actions';

const Footer = ({ categories }) => {
  const { data } = categories;
  let category = data.filter((elem) => elem.active);
  if (category && category.length > 4) {
    category = category.slice(0, 4);
  }

  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box className={classes.root}>
      <Container maxWidth='lg'>
        <Grid container className={classes.header}>
          <Grid item className={classes.headerTitleContainer}>
            <Box>
              <Typography gutterBottom variant='h6' className={classes.white}>
                Follow-us on social media!
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box>
              <FacebookIcon className={clsx(classes.icon, classes.white)} />
              <InstagramIcon className={clsx(classes.icon, classes.white)} />
              <YouTubeIcon className={clsx(classes.icon, classes.white)} />
              <RedditIcon className={clsx(classes.icon, classes.white)} />
              <TwitterIcon className={clsx(classes.icon, classes.white)} />
              <PinterestIcon className={clsx(classes.icon, classes.white)} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider className={classes.divider} />

      <Container maxWidth='lg' style={{ padding: matches && 'unset' }}>
        <Grid container className={classes.body} justify='space-between'>
          <Grid item xs={12} sm={4}>
            <Box
              style={{
                padding: matches && 20,
                paddingTop: matches && 'unset',
              }}
            >
              <Typography
                variant='h6'
                className={clsx(classes.title, classes.white)}
              >
                About the shop
              </Typography>
              <Typography variant='caption' className={classes.white}>
                Mr Nomad is a Mens brand, created by Aman
                <br />
                and Deepanshu, which specializes in the production of
                all-natural mens products.
              </Typography>
            </Box>
            {matches && <Divider className={classes.divider} />}
          </Grid>

          <Grid item xs={12} sm={2}>
            <Box
              style={{
                padding: matches && 20,
              }}
            >
              <Typography
                variant='h6'
                className={clsx(classes.title, classes.white)}
              >
                Shop
              </Typography>
              <div className={classes.section}>
                {category &&
                  category.length &&
                  category.map((cat) => (
                    <Button
                      key={cat._id}
                      className={classes.buttonText}
                      label={cat.categoryName}
                      component={Link}
                      to={`/${cat._id}/page/1`}
                    />
                  ))}
              </div>
            </Box>
            {matches && <Divider className={classes.divider} />}
          </Grid>

          <Grid item xs={12} sm={2}>
            <Box
              style={{
                padding: matches && 20,
              }}
            >
              <Typography
                variant='h6'
                className={clsx(classes.title, classes.white)}
              >
                About
              </Typography>
              <div className={classes.section}>
                {['Story', 'Journal', 'FAQ', 'Terms Of Usage'].map((text) => (
                  <Button
                    key={text}
                    className={classes.buttonText}
                    onClick={() => {}}
                    label={text}
                  />
                ))}
              </div>
            </Box>
            {matches && <Divider className={classes.divider} />}
          </Grid>

          <Grid item xs={12} sm={3}>
            <Box
              style={{
                padding: matches && 20,
              }}
            >
              <Typography
                variant='h6'
                className={clsx(classes.title, classes.white)}
              >
                Newsletter
              </Typography>
              <Typography variant='caption' className={classes.white}>
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
