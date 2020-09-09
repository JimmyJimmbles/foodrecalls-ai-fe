import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Divider, Drawer } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import PeopleIcon from '@material-ui/icons/People';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
// import ImageIcon from '@material-ui/icons/Image';
// import SettingsIcon from '@material-ui/icons/Settings';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import styles from './styles';
import { Profile } from './components';
import { GET_AUTHENTICATED_USER } from 'queries/user';
import { useQuery } from '@apollo/client';

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const initialState = {
    uuid: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);

  console.log('loading', loading);
  console.log('error', error);

  useEffect(() => {
    if (!loading && !error) {
      setUserData(data?.authenticatedUser);
    }
  }, [loading, error, data]);

  const classes = styles();
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
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
      <div {...rest} className={classnames(classes.root, className)}>
        <Profile userData={userData} />
        <Divider className={classes.divider} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
