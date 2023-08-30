import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Terms = lazy(() => import("../../container/pages/TNC"));
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const TNC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <Terms />} />
    </Switch>
  );
};

export default TNC;
