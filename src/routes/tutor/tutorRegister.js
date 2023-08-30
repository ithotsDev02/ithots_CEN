import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
const NewUserForm = lazy(() => import('../../container/NewUserForm/index'));

const UserForm = () => {
  const { path } = useRouteMatch();
  return (
      <Switch>
      <Route exact path={path} component={() => <NewUserForm type="tutor"/>}  />
    </Switch>
  );
};

export default UserForm;
