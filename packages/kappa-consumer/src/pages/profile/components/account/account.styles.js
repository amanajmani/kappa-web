import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0),
  },

  button: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  country: {
    textAlign: 'start',
    width: '100%',
  },
  message: {
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
  accountUpdateForm: {
    width: '100%',
  },
}));
