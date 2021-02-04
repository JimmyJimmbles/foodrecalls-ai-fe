import React, {useState, useEffect} from 'react';
import {Switch, Redirect} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_CURRENT_USER} from 'queries/user';
import {RouteWithLayout} from './components';
import {Main as MainLayout} from './layouts';
import {saveTokens, getTokens} from 'local-storage';

import {
  LogIn as LogInView,
  Dashboard as DashboardView,
  CompanyDashboard as CompanyDashboardView,
  Account as AccountView,
  RecallList as RecallsView,
  CompanyList as CompaniesView,
} from './views';

const Routes = () => {
  const [userToken, setUserToken] = useState(getTokens());
  const {loading, error, data} = useQuery(GET_CURRENT_USER);
  const [myData, setMyData] = useState({});
  const [companyID, setCompanyID] = useState(null);

  useEffect(() => {
    setUserToken(userToken);
  }, [userToken]);

  useEffect(() => {
    if (!companyID && myData?.me?.company?.id) {
      setCompanyID(myData?.me?.company?.id);
    } else {
      setCompanyID(companyID);
    }
  }, [companyID, myData]);

  useEffect(() => {
    if (!loading && !error && data) {
      setMyData(data);
    }
  }, [loading, error, data]);

  if (userToken) saveTokens(userToken);

  return (
    <Switch>
      {!userToken && <Redirect exact from="/" to="/login" />}
      <RouteWithLayout
        component={LogInView}
        exact
        layout={MainLayout}
        path="/login"
        setUserToken={setUserToken}
      />
      <RouteWithLayout
        component={CompanyDashboardView}
        layout={MainLayout}
        path="/dashboard/:id"
        setUserToken={setUserToken}
        companyID={companyID}
      />
      <RouteWithLayout
        component={DashboardView}
        layout={MainLayout}
        path="/dashboard"
        setUserToken={setUserToken}
        companyID={companyID}
      />
      <RouteWithLayout
        component={RecallsView}
        exact
        layout={MainLayout}
        path="/recalls/:id"
        setUserToken={setUserToken}
        companyID={companyID}
      />
      <RouteWithLayout
        component={CompaniesView}
        exact
        layout={MainLayout}
        path="/companies"
        setUserToken={setUserToken}
        setCompanyID={setCompanyID}
        companyID={companyID}
      />
      <RouteWithLayout
        component={() => <AccountView loading={loading} error={error} myData={myData} />}
        exact
        layout={MainLayout}
        path="/account"
        setUserToken={setUserToken}
        companyID={companyID}
      />
    </Switch>
  );
};

export default Routes;
