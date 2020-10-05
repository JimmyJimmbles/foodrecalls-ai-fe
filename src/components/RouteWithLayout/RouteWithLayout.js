import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithLayout = ({
  layout: Layout,
  component: Component,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(matchProps) => (
        <Layout>
          <CssBaseline />
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
