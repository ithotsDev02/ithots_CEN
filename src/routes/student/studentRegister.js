import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const NewUserForm = lazy(() => import('../../container/NewUserForm/index'));
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const UserForm = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={path}
        component={() => <NewUserForm type="student" />}
      />
    </Switch>
  );
};

export default UserForm;
