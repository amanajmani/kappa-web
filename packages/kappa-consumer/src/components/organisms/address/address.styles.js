import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    padding: '16px',
  },
  addAddressBtn: {
    borderRadius: '0px',
    width: '40%',
  },
  textCenter: {
    textAlign: 'center',
    marginTop: '16px',
  },
}));
