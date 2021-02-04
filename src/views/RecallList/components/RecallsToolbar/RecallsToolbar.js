import React from 'react';
import classnames from 'classnames';
import { Typography } from '@material-ui/core';
import styles from './styles';

const RecallsToolbar = ({ companyName, className }) => {
  const classes = styles();
  const { root, row, spacer, exportButton, searchInput } = classes;

  return (
    <div className={classnames(root, className)}>
      <div className={row}>
        <Typography variant="h4">{companyName} Recall Data</Typography>
        <span className={spacer} />
        {/* <Button variant="outlined" color="primary" className={exportButton}>
          Export
        </Button> */}
      </div>
      {/* <div className={row}>
        <SearchInput className={searchInput} placeholder="Search Recalls" />
      </div> */}
    </div>
  );
};

export default RecallsToolbar;
