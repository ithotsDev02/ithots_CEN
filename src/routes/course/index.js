import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ItemCart from "./cart";
import withUserLayout from "../../layout/withUserLayout";

const Carts = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <>
        <Suspense
          fallback={
            <div className="spin">
              <Spin />
            </div>
          }
        >
          <Route path={`${path}`} component={ItemCart} />
        </Suspense>
      </>
    </Switch>
  );
};

export default withUserLayout(Carts);
