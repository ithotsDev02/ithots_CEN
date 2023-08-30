import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const TutorsList = lazy(() => import("../../container/admin/tutorList/index"));
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const TutorLst = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <TutorsList />} />
    </Switch>
  );
};

export default TutorLst;
