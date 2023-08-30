import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const AllCourses = lazy(() =>
  import("../../container/ecommerce/product/Products")
);
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const CoursesHome = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={path}
        component={() => <AllCourses showSearch={true} />}
      />
    </Switch>
  );
};

export default CoursesHome;
