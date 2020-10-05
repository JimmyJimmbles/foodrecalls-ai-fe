import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles';
import { Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import { GET_CURRENT_USER } from 'queries/user';
import { useQuery } from '@apollo/client';
import { AccountProfile, AccountDetails } from './components';

import { getFullName, getInitials } from 'helpers';

const Account = ({ className }) => {
  const classes = styles();
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  const [myData, setMyData] = useState({});

  useEffect(() => {
    if (!loading && !error && data) {
      setMyData(data);
    }
  }, [loading, error, data]);

  const { root } = classes;

  if (loading || !data || !myData || !myData.me) {
    return (
      <div className={classnames(root, className)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const { firstName, lastName, email } = myData.me;

  const jobTitle = myData.me?.jobTitle;
  const role = myData.me?.role;
  const companyName = myData.me?.company?.name;
  const fullName = getFullName(firstName, lastName);
  const initials = getInitials(fullName);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile
            fullName={fullName}
            email={email}
            initials={initials}
            jobTitle={jobTitle}
            companyName={companyName}
          />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails
            firstName={firstName}
            lastName={lastName}
            email={email}
            role={role}
            jobTitle={jobTitle}
            companyName={companyName}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
