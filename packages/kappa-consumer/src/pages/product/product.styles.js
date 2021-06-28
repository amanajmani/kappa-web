import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    margin: theme.spacing(8, 'auto'),
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  slideImageContainer: {
    maxWidth: 450,
    flexGrow: 1,
    '& .MuiMobileStepper-root': {
      background: 'unset',
    },
  },
  image: {
    height: 480,
    display: 'block',
    maxWidth: 450,
    overflow: 'hidden',
    width: '100%',
  },
  leftSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  productDetailsContainer: {
    height: '100%',
    // [theme.breakpoints.down('sm')]: {
    //   height: 380,
    //   alignItems: 'center',
    //   textAlign: 'center',
    // },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'unset !important',
      textAlign: 'center !important',
    },
  },
  quantityGridContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  productActionsContainer: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cartButtonContainer: {
    width: '100%',
  },
  cartButton: {
    borderRadius: 12,
    width: '60%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: theme.spacing(2),
    },
  },
  description: {
    marginTop: theme.spacing(4),
    maxWidth: 500,
  },
}));
