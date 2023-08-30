import React, { lazy, Suspense } from "react";
import AuthLayout from "../container/profile/authentication/Index";

import { Spin } from "antd";

const StudentLogin = lazy(() =>
  import("../container/student/authentication/overview/SignIn")
);

const routes = [
  {
    path: "/login",
    exact: true,
    name: "Student Login",
    component: StudentLogin,
  },
];
export default routes;
