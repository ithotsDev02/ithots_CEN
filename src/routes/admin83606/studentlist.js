import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const StudentsList = lazy(() =>
  import("../../container/admin/studentList/index")
);
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const StudentLst = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <StudentsList />} />
    </Switch>
  );
};

export default StudentLst;
