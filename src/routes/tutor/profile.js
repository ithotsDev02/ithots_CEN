import React, { lazy } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

const TutorProfile = lazy(() => import("../../container/tutor/profile/index"));

const Profile = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <TutorProfile />} />
    </Switch>
  );
};

export default Profile;
