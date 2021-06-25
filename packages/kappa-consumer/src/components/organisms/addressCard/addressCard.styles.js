import { makeStyles } from '@material-ui/core/styles';

const borderRadius = 4;

export default makeStyles((theme) => ({
  addressPaper: {
    minHeight: '80px',
    maxHeight: '120px',
    borderRadius,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '1rem',
    padding: '12px',
    [theme.breakpoints.down('sm')]: {
      // width: '100%',
    },
    position: 'relative',
  },

  EditIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    background: '#E0E0E0',
    borderRadius: '50%',
    height: '24px',
    width: '24px',
    padding: '4px',
  },

  deleteIcon: {
    position: 'absolute',
    top: 40,
    right: -10,
    background: '#E0E0E0',
    borderRadius: '50%',
    height: '24px',
    width: '24px',
    padding: '4px',
  },

  'addressPaper:nth-of-type(1)': {
    marginTop: '1rem',
  },

  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  flexStart: {
    display: 'flex',
    justifyContent: 'start',
    width: '100%',
  },

  scrollable: {
    'max-height': '500px',
    overflowY: 'scroll',
    marginTop: '14px',
    width: '100%',
    padding: '16px',
    // margin: '0 auto',
  },
  countryName: {
    fontWeight: '500',
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  addressFont: {
    fontSize: '1.1rem',
    fontWeight: '500',
  },
}));
