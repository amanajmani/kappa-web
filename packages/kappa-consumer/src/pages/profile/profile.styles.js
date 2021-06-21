import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'space-around',
    },
    '& .MuiTab-wrapper': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
  },
}));
