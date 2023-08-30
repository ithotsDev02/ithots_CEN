import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const About = lazy(() => import("../../container/pages/About"));
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const Abouts = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <About />} />
    </Switch>
  );
};

export default Abouts;
