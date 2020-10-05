import React, { useState, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';
import { Grid, CircularProgress } from '@material-ui/core';
import {
  LogIn as LogInView,
  Dashboard as DashboardView,
  Account as AccountView,
  RecallList as RecallsView,
  CompanyList as CompaniesView,
} from './views';
import { GET_CURRENT_USER } from 'queries/user';
import { useQuery } from '@apollo/client';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <RouteWithLayout
        component={LogInView}
        exact
        layout={MainLayout}
        path="/login"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={RecallsView}
        exact
        layout={MainLayout}
        path="/recalls"
        test="hello world"
      />
      <RouteWithLayout
        component={CompaniesView}
        exact
        layout={MainLayout}
        path="/companies"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
    </Switch>
  );
};

export default Routes;
