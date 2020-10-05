import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles';
import { List, ListItem, Button } from '@material-ui/core';

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = ({ pages, className, ...props }) => {
  const classes = styles();

  return (
    <List {...props} className={classnames(classes.root, className)}>
      {pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarNav;
