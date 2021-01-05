import { createMuiTheme } from '@material-ui/core/styles';

const purplepink = '#F04393';
const yellow = '#F9C449';
const arcGrey = '#3A3B3C';

export default createMuiTheme({
  palette: {
    common: {
      purple: `${purplepink}`,
      yellow: `${yellow}`,
    },
    primary: {
      main: `${purplepink}`,
    },
    secondary: {
      main: `${yellow}`,
    },
  },
  typography: {
    tab: {
      textTransform: 'none',
      fontWeight: '700',
      fontSize: '0.9rem',
    },
    h4: {
      color: arcGrey,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '1.2rem',
      color: arcGrey,
      fontWeight: 400,
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {},
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${purplepink}`,
        },
      },
    },
  },
});
