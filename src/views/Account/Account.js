import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';

import { getFullName, getInitials } from 'helpers';

const Account = ({ className, loading, error, myData }) => {
  console.log('me', myData);
  const classes = styles();
  const { root } = classes;

  if (loading || !myData || !myData.me) {
    return (
      <div className={classnames(root, className)}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const { uuid, firstName, lastName, email } = myData.me;

  const jobTitle = myData.me?.jobTitle;
  const role = myData.me?.role;
  const companyName = myData.me?.company?.name;
  const fullName = getFullName(firstName, lastName);
  const initials = getInitials(fullName);

  return (
    <div className={root}>
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
            uuid={uuid}
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
