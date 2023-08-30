import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Calendar = lazy(() => import("../../container/calendar/index"));
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const ItemCart = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <Calendar />} />
    </Switch>
  );
};

export default ItemCart;
