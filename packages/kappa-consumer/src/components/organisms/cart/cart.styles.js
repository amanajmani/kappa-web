import { makeStyles } from '@material-ui/core/styles';

// const borderRadius = 27;

export default makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 35,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  emptyCart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      paddingTop: theme.spacing(3),
    },
  },
  productsList: {
    overflowY: 'scroll',
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  product: {
    display: 'flex',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  image: {
    [theme.breakpoints.only('xs')]: {
      width: 110,
      height: 110,
    },
    width: 140,
    height: 140,
    borderRadius: 27,
    marginRight: 20,
  },
  productDescription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeButton: {
    marginLeft: 10,
  },
  footer: {
    [theme.breakpoints.only('xs')]: {
      height: 100,
    },
    height: 200,
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(2),
    flexDirection: 'column',
  },
  checkoutButton: {
    padding: theme.spacing(2),
  },
}));
