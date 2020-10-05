import React from 'react';
import classnames from 'classnames';
import { Card, CardContent, Avatar, Typography } from '@material-ui/core';
import styles from './styles';

const AccountProfile = ({
  fullName,
  email,
  initials,
  jobTitle,
  companyName,
  className,
}) => {
  const classes = styles();

  return (
    <Card className={classnames(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {fullName}
            </Typography>
            <Typography gutterBottom color="textSecondary" variant="h4">
              {companyName}
            </Typography>
            <Typography gutterBottom color="textSecondary" variant="h6">
              {email}
            </Typography>
            <Typography variant="h6">{jobTitle}</Typography>
          </div>
          <Avatar className={classes.avatar}>{initials}</Avatar>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountProfile;
