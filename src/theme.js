import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    type: "light",
    common: {
      black: "#424242",
      white: "#fff"
    },
    primary: {
      main: "rgba(0, 145, 234, 0.83)"
    },
    secondary: {
      main: "#ffc107"
    },
    text: {
      primary: "#424242",
      secondary: "rgba(0, 0, 0, 0.49)"
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    display1: {
      color: "#424242"
    },
  }
});