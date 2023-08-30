import React, { lazy } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

const CreateCourseUser = lazy(() =>
  import("../../container/CreateCourse/index.js")
);

const CreateCourse = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <CreateCourseUser />} />
    </Switch>
  );
};

export default CreateCourse;
