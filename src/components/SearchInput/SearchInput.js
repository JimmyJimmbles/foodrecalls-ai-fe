import React from 'react';
import classnames from 'classnames';
import styles from './styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ className, onChange, placeholder, style }) => {
  const classes = styles();
  const { root, icon, input } = classes;

  return (
    <Paper className={classnames(root, className)} style={style}>
      <SearchIcon className={icon} />
      <Input
        placeholder={placeholder}
        className={input}
        disableUnderline
        onChange={onChange}
      />
    </Paper>
  );
};

export default SearchInput;
