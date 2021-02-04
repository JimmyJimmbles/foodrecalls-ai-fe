import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

const RouteWithLayout = ({
  layout: Layout,
  component: Component,
  setUserToken,
  setCompanyID,
  companyID,
  ...props
}) => {
  console.log({ setUserToken });
  return (
    <Route
      {...props}
      render={(matchProps) => (
        <Layout
          setUserToken={setUserToken}
          setCompanyID={setCompanyID}
          companyID={companyID}
        >
          <CssBaseline />
          <Component
            {...matchProps}
            setUserToken={setUserToken}
            setCompanyID={setCompanyID}
            companyID={companyID}
          />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
