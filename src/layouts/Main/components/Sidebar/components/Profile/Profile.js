import React, { forwardRef } from 'react';
// import { NavLink as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles';
import { Typography, Button } from '@material-ui/core';

const Profile = (props) => {
  const {
    className,
    userData: { uuid, firstName, lastName, email },
    ...rest
  } = props;

  const classes = styles();
  const { root, button } = classes;

  console.log('uuid', uuid);
  console.log('firstName', firstName);

  if (!uuid) {
    return (
      <div {...rest} className={classnames(root, className)}>
        <Typography>Must be logged in</Typography>
        <Button
          color="primary"
          size="small"
          variant="outlined"
          className={button}
          to="/"
        >
          Log In
        </Button>
      </div>
    );
  }

  return (
    <div {...rest} className={classnames(root, className)}>
      <Typography>
        {firstName} {lastName}
      </Typography>
    </div>
  );
};

export default Profile;
