import React, { lazy } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

const EnrolledStudents = lazy(() =>
  import("../../container/tutor/courseEnrollment/index")
);

const Profile = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <EnrolledStudents />} />
    </Switch>
  );
};

export default EnrolledStudents;
