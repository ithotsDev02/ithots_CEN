import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import withAdminLayout from "../../layout/withAdminLayout";

import About from "../../container/pages/About";
const Abt = () => {
  const { path } = useRouteMatch();
  console.log("component mounted");
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={`${path}`} component={About} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Abt);
