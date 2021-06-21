import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0),
  },
  header: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  title: {
    textTransform: 'capitalize',
    transition: 'font 0.3s ease',
    transform: 'translate(1px, 1px)',
  },
  headerMenu: {
    position: 'sticky',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 1,
    top: 0,
    paddingBottom: theme.spacing(1),
  },
  fontShrink: {
    animation: 'fontShrink .2s forwards',
    transition: 'all ease-in',
  },
  '@global': {
    '@keyframes fontShrink': {
      '100%': {
        transform: 'scale(0.6)',
        marginLeft: -50,
      },
    },
  },
  headerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    // [theme.breakpoints.only('xs')]: {
    //   display: 'none',
    // },
  },
  filtersButtonContainer: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  button: {
    // padding: theme.spacing(2, 10),
    borderRadius: 'unset',
    fontWeight: 'bold',
    [theme.breakpoints.only('xs')]: {
      flex: 1,
    },
  },
  menu: {
    '& div': {
      marginTop: theme.spacing(6.8),
    },
  },
  menuItem: {
    padding: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(6),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3, 0),
  },

  //   Tab
  tabBar: {
    border: 0,
  },
  singleTab: {
    display: 'flex',
  },

  'MuiTabs-flexContainer': {
    display: 'flex',
    background: 'blue',
    justifyContent: 'space-evenly',
  },

  'MuiTab-wrapper': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));
