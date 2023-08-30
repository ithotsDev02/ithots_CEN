import React, { lazy } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

const CourseDetail = lazy(() =>
  import("../../container/courseDetail/index")
);

const CourseInfo = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
          <Route exact path={path} component={() => <CourseDetail />} />
    </Switch>
  );
};

export default CourseInfo;
