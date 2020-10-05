import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import classnames from 'classnames';
import styles from './styles';
import { GET_CURRENT_USER } from 'queries/user';
import { useQuery } from '@apollo/client';
import { deleteTokens } from 'local-storage';

const Topbar = ({ className, onSidebarOpen, ...props }) => {
  const { client, loading, data } = useQuery(GET_CURRENT_USER);
  const classes = styles();

  const [notifications] = useState([]);

  // Reset Apollo and local store on logout
  const handleLogOut = () => {
    deleteTokens();
    client.clearStore();
  };

  return (
    <AppBar {...props} className={classnames(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/dashboard" className={classes.logo}>
          FoodRecalls<span className={classes.logoAlt}>.ai</span>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {data && data.me ? (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          ) : (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              component={RouterLink}
              to="/"
            >
              Log In
            </Button>
          )}
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
