import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Cart = lazy(() => import("../../container/ecommerce/Cart"));
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const ItemCart = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <Cart />} />
    </Switch>
  );
};

export default ItemCart;
