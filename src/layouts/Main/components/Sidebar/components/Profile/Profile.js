import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles';
import { Typography, Avatar, CircularProgress } from '@material-ui/core';
import { GET_CURRENT_USER } from 'queries/user';
import { useQuery } from '@apollo/client';

import { getFullName, getInitials } from 'helpers';

const Profile = ({ className, myData }) => {
  const classes = styles();
  const { root, primary, secondary, teal, avatar, userData } = classes;

  const { firstName, lastName, company } = myData.me;

  const jobTitle = myData.me?.jobTitle;

  const fullName = getFullName(firstName, lastName);
  const initials = getInitials(fullName);

  const getRandomBGColor = () => {
    const colors = [primary, secondary, teal];

    return colors[Math.floor(Math.random() * 3)];
  };

  return (
    <div className={classnames(root, className)}>
      <Avatar
        alt={`${fullName}`}
        className={classnames(avatar, getRandomBGColor())}
      >
        {initials}
      </Avatar>
      <Typography variant="h5">{fullName}</Typography>
      <Typography className={userData} variant="body1">
        {company.name}
      </Typography>
      <Typography variant="body2">{jobTitle}</Typography>
    </div>
  );
};

export default Profile;
