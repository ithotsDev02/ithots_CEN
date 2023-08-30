import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const PaymentSuccess = lazy(() =>
  import("../../components/paymentSuccess/index")
);
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const Payment = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={() => <PaymentSuccess />} />
    </Switch>
  );
};

export default Payment;
