import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({
  className,
  name,
  values,
  onChange,
  placeholder,
  style,
}) => {
  const classes = styles();
  const { root, icon, input } = classes;

  return (
    <Paper className={classnames(root, className)} style={style}>
      <SearchIcon className={icon} />
      <Input
        name={name}
        placeholder={placeholder}
        className={input}
        disableUnderline
        value={values}
        onChange={onChange}
      />
    </Paper>
  );
};

export default SearchInput;
