import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import {Divider, Drawer, CircularProgress, Typography} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import styles from './styles';
import {Profile, SidebarNav} from './components';
import {GET_CURRENT_USER} from 'queries/user';
import {useQuery} from '@apollo/client';

const Sidebar = ({open, variant, onClose, className, companyID}) => {
  const classes = styles();
  const {drawer, root, divider, nav} = classes;

  const {loading, error, data} = useQuery(GET_CURRENT_USER);

  const [myData, setMyData] = useState({});

  useEffect(() => {
    if (!loading && !error && data) {
      setMyData(data);
    }
  }, [loading, error, data]);

  if (loading || !data || !myData || !myData.me) {
    return (
      <Drawer
        anchor="left"
        classes={{paper: drawer}}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <div className={classnames(root, className)}>
          <Typography align="center" variant="subtitle1" gutterBottom={true}>
            Must be logged in.
          </Typography>
          <Divider className={divider} />
        </div>
      </Drawer>
    );
  }

  console.log({companyID});

  const pages = [
    {
      title: 'Dashboard',
      href: `/dashboard/${companyID}`,
      icon: <DashboardIcon />,
    },
    {
      title: 'Recalls',
      href: `/recalls/${companyID}`,
      icon: <EqualizerRoundedIcon />,
    },
  ];

  const adminPages = [
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
    <Drawer anchor="left" classes={{paper: drawer}} onClose={onClose} open={open} variant={variant}>
      <div className={classnames(root, className)}>
        <Profile myData={myData} />
        <Divider className={divider} />
        <SidebarNav className={nav} pages={pages} />
        <Divider />
        <SidebarNav className={nav} pages={adminPages} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
