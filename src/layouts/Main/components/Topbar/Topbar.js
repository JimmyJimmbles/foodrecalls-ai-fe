import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import classnames from 'classnames';
import styles from './styles';

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = styles();

  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={classnames(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/" className={classes.logo}>
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
          <IconButton className={classes.signOutButton} color="inherit">
            <PowerSettingsNew />
          </IconButton>
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
