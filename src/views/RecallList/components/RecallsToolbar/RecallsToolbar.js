import React from 'react';
import classnames from 'classnames';
import { Button, Typography } from '@material-ui/core';
import styles from './styles';
import { SearchInput } from 'components';

const RecallsToolbar = ({ className }) => {
  const classes = styles();

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.row}>
        <Typography variant="h4">Recall Data</Typography>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.exportButton}
        >
          Export
        </Button>
        {/* <Button
          className={classes.addButton}
          color="primary"
          variant="contained"
        >
          Add Recall
        </Button> */}
      </div>
      {/* <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Recalls"
        />
      </div> */}
    </div>
  );
};

export default RecallsToolbar;
