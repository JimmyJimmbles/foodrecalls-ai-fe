// Vendors/Utils
import React, {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {useForm} from 'hooks';
import {Switch, Redirect} from 'react-router-dom';

import {LOGIN_USER} from '../../queries/user';

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
import {Alert} from 'components';
import styles from './styles';

const LogIn = ({history, setUserToken}) => {
  const classes = styles();
  // Set states
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Set up Login Mutation
  const [loginUser, queryResponse] = useMutation(LOGIN_USER);

  const handleLogin = ({email, password}) => loginUser({variables: {email, password}});

  // useForm hook to handle the Login mutation and set sates of form components
  const {handleChange, handleSubmit, values} = useForm(handleLogin, {
    email: '',
    password: '',
  });

  // Get all relevant data.
  const {email, password} = values;
  const {called, loading, error, data} = queryResponse;

  useEffect(() => {
    if (called && loading) setIsLoading(true);

    if (called && error) {
      setLoginError(error);
      setIsLoading(false);
    }

    if (data && data.loginUser) {
      setUserToken(data.loginUser.token);
      setIsLoading(false);
    }
  }, [called, loading, error, data, setUserToken]);

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  } else if (called && data && data.loginUser.token) {
    const redirect = <Redirect to="/dashboard" />;
    return redirect;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box className={classes.paper} padding={5} border={1} borderColor="grey.300" borderRadius={4}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Log In
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
            Log In
          </Button>
        </form>
      </Box>
      {loginError && <Alert severity="error">{loginError.message}</Alert>}
    </Container>
  );
};

export default LogIn;
