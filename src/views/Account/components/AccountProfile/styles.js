import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 70,
    width: 70,
    flexShrink: 0,
    flexGrow: 0,
  },
}));

export default styles;
