import React, { useState } from 'react';
import classnames from 'classnames';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import styles from './styles';

const AccountDetails = ({
  firstName,
  lastName,
  email,
  role,
  jobTitle,
  companyName,
  className,
}) => {
  const classes = styles();

  const { root, button } = classes;

  const [values, setValues] = useState({
    firstName,
    lastName,
    email,
    role,
    jobTitle,
    companyName,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const roles = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  return (
    <Card className={classnames(root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Role"
                margin="dense"
                name="role"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.role}
                variant="outlined"
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                margin="dense"
                name="jobTitle"
                onChange={handleChange}
                required
                value={values.jobTitle}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Company"
                margin="dense"
                name="company"
                onChange={handleChange}
                value={values.companyName}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {/* TODO: SET UP MUTATION TO SAVE THE DATA */}
          <Button color="primary" className={button} variant="contained">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default AccountDetails;
