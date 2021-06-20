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
    borderRadius: 12,
    minWidth: '100px',
    marginTop: '12px',
    background: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
    },
  },

  backButton: {
    borderRadius: 12,
    minWidth: '100px',
    marginTop: '12px',
    marginRight: '12px',
    backgroundColor: '#fff',
    border: '1px solid gray',
    color: '#3c52b2',
    '&:hover': {
      background: 'black',
      color: 'white',
    },
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
    justifyContent: 'center',
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
}));
