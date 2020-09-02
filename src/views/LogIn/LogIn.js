// Vendors/Utils
import React from 'react';
import { Redirect } from 'react-router';
import { useAuthenticationForm } from 'hooks';
import { saveTokens } from 'local-storage';

// UI Components
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from 'components';
import styles from './styles';

export const LogIn = () => {
  const classes = styles();
  const {
    handleChange,
    handleSubmit,
    values,
    called,
    loading,
    data,
    error,
  } = useAuthenticationForm({
    email: '',
    password: '',
  });

  const { email, password } = values;

  if (called && loading) return <CircularProgress color="secondary" />;

  if (data && data.loginUser) {
    saveTokens(data.loginUser.token);

    // Redirect to home page
    return <Redirect to="dashboard" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        className={classes.paper}
        padding={5}
        border={2}
        borderColor="grey.300"
        borderRadius={4}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </Box>
      {error && <Alert severity="error">{error.message}</Alert>}
    </Container>
  );
};

export default LogIn;
