import { createMuiTheme } from '@material-ui/core/styles';

// Make edits to the theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#92d050',
      main: '#78a45a',
    },
    secondary: {
      main: '#f4bb50',
      dark: '#fea700',
    },
    info: {
      main: '#4878d1',
    },
  },
});

export default theme;
