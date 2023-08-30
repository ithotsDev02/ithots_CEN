import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import withAdminLayout from "../../layout/withAdminLayout";
const TNC = () => {
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
        <Route path={`${path}`} component={Terms} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(TNC);
