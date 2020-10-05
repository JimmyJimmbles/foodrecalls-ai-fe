import { deepOrange, deepPurple, teal } from '@material-ui/core/colors';
import theme from 'theme';

export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export const getFullName = (fName, lName) => `${fName} ${lName}`;

export const getRandomColor = () => {
  const styles = {
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    teal: {
      color: theme.palette.getContrastText(teal[500]),
      backgroundColor: teal[500],
    },
  };
  const colors = [styles.orange, styles.purple, styles.teal];

  return colors[Math.floor(Math.random() * 3)];
};
