import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@material-ui/core';
import { Alert } from 'components';
import { useMutation } from '@apollo/client';
import styles from './styles';
import { useForm } from 'hooks';
import { UPDATE_ME } from 'queries/user';

const AccountDetails = ({
  uuid,
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

  // Set states
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  // Update current user mutation.
  const [updateUser, queryResponse] = useMutation(UPDATE_ME);

  const updateUserData = ({ firstName, lastName, email, role, jobTitle }) =>
    updateUser({
      variables: {
        uuid,
        updateUserInput: { firstName, lastName, email, role, jobTitle },
      },
    });

  const { handleChange, handleSubmit, values } = useForm(updateUserData, {
    firstName,
    lastName,
    email,
    role,
    jobTitle,
    companyName,
  });

  const roles = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  const { called, loading, error, data } = queryResponse;

  useEffect(() => {
    if (called && loading) setIsLoading(true);

    if (called && error) {
      setUpdateError(error);
      setIsLoading(false);
    }

    if (data && data.updateUser) setIsLoading(false);
  }, [called, loading, error, data]);

  return (
    <Card className={classnames(root, className)}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {isLoading ? (
              <Grid item xs={12}>
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <>
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
              </>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            className={button}
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </CardActions>
      </form>
      {updateError && <Alert severity="error">{updateError.message}</Alert>}
    </Card>
  );
};

export default AccountDetails;
