import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
  },
  card: {
   borderRadius: 0,
   position: 'relative',
   top: '0',
   transition: 'top ease 0.1s',
   '&:hover': {
    top: '-10px'
   },
  },
  image: {
    maxWidth: '100%',
  },
}));
