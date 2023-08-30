import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const TransactionsTable = lazy(() =>
  import("../../container/student/transactions/index")
);
// const GalleryTwo = lazy(() => import('../../container/pages/GalleryTwo'));

const Transaction = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={path}
        component={() => <TransactionsTable from={"admin"} />}
      />
    </Switch>
  );
};

export default Transaction;
