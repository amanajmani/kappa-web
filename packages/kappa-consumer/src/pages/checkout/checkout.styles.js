import { makeStyles } from '@material-ui/core/styles';

const borderRadius = 8;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    position: 'relative',
    flexDirection: 'column',
  },

  title: {
    textAlign: 'center',
  },

  container: {
    height: '100%',
  },

  stepperContent: {
    display: 'flex',
    flexDirection: 'column',
    'max-width': '500px',
    margin: '0 auto',
  },

  cartButton: {
    borderRadius: 0,
    minWidth: '100px',
    marginTop: '12px',
  },

  backButton: {
    borderRadius: 0,
    minWidth: '100px',
    marginTop: '12px',
    marginRight: '12px',
    border: '1px solid gray',
  },

  stepperDiv: {
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      order: 2,
      justifyContent: 'center',
    },
  },
  paymentPaper: {
    margin: '16px 0px',
    padding: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    },
  },
  stepperControls: {
    margin: '16px 0px',
  },
  instructions: {
    textAlign: 'center',
  },

  cashOnDelivery: {
    width: '100%',
    marginTop: '12px',
    backgroundColor: '#fff',
    border: '1px solid gray',
    color: '#3c52b2',
    '&:hover': {
      background: 'black',
      color: 'white',
    },
  },
  homeButton: {
    width: '100%',
  },
  image: {},
}));
