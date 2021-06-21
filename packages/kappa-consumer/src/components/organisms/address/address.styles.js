import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  },
  textCenter: {
    textAlign: 'center',
    marginTop: '16px',
  },
}));
