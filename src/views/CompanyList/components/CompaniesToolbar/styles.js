import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  addButton: {
    color: theme.palette.white,
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

export default styles;
