import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import AuthLayout from "../container/profile/authentication/Index";
import withAdminLayout from "../layout/withAdminLayout";

const Login = lazy(() =>
  import("../container/profile/authentication/overview/SignIn")
);
const Home = lazy(() => import("../container/ecommerce/product/Products"));
const SuperLogin = lazy(() =>
  import("../container/superadmin/authentication/overview/SignIn")
);

const AdminLogin = lazy(() =>
  import("../container/admin/authentication/overview/SignIn")
);
const TutorLogin = lazy(() =>
  import("../container/tutor/authentication/overview/SignIn")
);

const StudentLogin = lazy(() =>
  import("../container/student/authentication/overview/SignIn")
);
const UserSignup = lazy(() =>
  import("../container/home/authentication/overview/SignIn")
);
const NotFound = () => {
  return <Redirect to="/" />;
};

const FrontendRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        {/* <Route exact path="/" component={Home} />s */}
        <Route exact path={`${path}/admin`} component={AdminLogin} />
        <Route exact path={`${path}/sadmin`} component={SuperLogin} />
        <Route exact path={`${path}/tutor`} component={TutorLogin} />
        <Route exact path={`${path}/student`} component={StudentLogin} />
        <Route
          path={`${path}/student/signup`}
          component={() => <UserSignup type="student" />}
        />
        <Route
          path={`${path}/tutor/signup`}
          component={() => <UserSignup type="tutor" />}
        />

        {/* <Route path={`${path}`} component={CoursesHome} /> */}
        {/* <Route exact path="/admin83606" component={AdminLogin} /> */}
        {/* <Route exact path="/sadmin56355" component={SuperLogin} /> */}
        {/* <Route exact path="/tutor" component={TutorLogin} />
        <Route exact path="/student" component={StudentLogin} />
        <Route exact path="/signup" component={UserSignup} /> */}
      </Suspense>
    </Switch>
  );
};
export default withAdminLayout(FrontendRoutes);
// export default AuthLayout(FrontendRoutes);
