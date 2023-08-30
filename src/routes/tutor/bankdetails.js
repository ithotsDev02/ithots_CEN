import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const BankDetails = lazy(() => import("../../container/tutor/BankDetails"));
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const Info = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <BankDetails />} />
    </Switch>
  );
};

export default Info;
