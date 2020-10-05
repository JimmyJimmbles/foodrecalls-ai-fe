import React from 'react';
import classnames from 'classnames';
import { Divider, Drawer } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import styles from './styles';
import { Profile, SidebarNav } from './components';

const Sidebar = ({ open, variant, onClose, className, ...props }) => {
  const classes = styles();
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Recalls',
      href: '/recalls',
      icon: <EqualizerRoundedIcon />,
    },
    {
      title: 'All Companies',
      href: '/companies',
      icon: <PeopleAltIcon />,
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={classnames(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
