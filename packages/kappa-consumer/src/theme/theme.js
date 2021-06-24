import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 500,
  //     md: 960,
  //     lg: 1280,
  //     xl: 1920,
  //   },
  // },
  shape: {
    borderRadiusSecondary: 20,
  },
  typography: {
    fontFamily: ['"Poppins"', 'sans-serif'].join(','),
    // h4: {
    //   textTransform: 'uppercase',
    // },
    h4: {
      // fontWeight: 700,
    },
    // body1: {
    //   textTransform: 'uppercase',
    //   letterSpacing: '0.2em',
    //   color: '#1c1b1b',
    // },
    h6: {
      // textTransform: 'uppercase',
      // textTransform: 'uppercase',
      // letterSpacing: '0.2em',
      // color: '#1c1b1b',
      fontWeight: 600,
    },
    h5: {
      // textTransform: 'uppercase',
      // textTransform: 'uppercase',
      // letterSpacing: '0.2em',
      // color: '#1c1b1b',
      // fontWeight: 600,
    },
    button: {
      textTransform: 'unset',
    },
    body1: {
      // color: '#6a6a6a',
      // textTransform: 'uppercase',
      // letterSpacing: '0.2em',
    },
    caption: {
      // color: '#595959',
      lineHeight: 2.2,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#5C45E3',
      secondary: '#fff',
    },
    text: {
      primary: '#111111',
      secondary: '#757575',
      white: '#fff',
    },
    secondary: {
      main: '#5BB02D',
      dark: '#BBE1FF',
    },
    // background: {
    //   default: '#ECECEC',
    //   product: '#63ceb2',
    // },
    // action: {
    //   disabledBackground: 'rgba(0, 0, 0, 0.12)',
    // },
    // common: {
    //   tableColor: '#6CA0DC',
    // },
    // divider: 'rgba(0, 0, 0, 0.12)',
  },
});

export default theme;
