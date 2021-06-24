import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  
  rootButton: {
    color: 'white',
    '& .MuiButton-label': {
      color: 'white',
    },
    '& .MuiButtonBase-root': {
      color: 'white',
    },
  },
}));
