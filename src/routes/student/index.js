import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Dashboard from "./dashboard";
import NewUserForm from "./studentRegister";
import CoursesHome from "./allcourses";
import Transaction from "./transactions";
import CourseInfo from "./coursedetail";
import ItemCart from "./cart";

import TutorProfile from "../tutor/profile";

import withAdminLayout from "../../layout/withAdminLayout";
const Student = () => {
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
        <Route path={`${path}/coursedetail/:id`} component={CourseInfo} />
        <Route path={`${path}/tutor-profile/:id`} component={TutorProfile} />
        <Route path={`${path}/cart`} component={ItemCart} />
        <Route path={`${path}/newStudent`} component={NewUserForm} />
        <Route path={`${path}/allcourses`} component={CoursesHome} />
        <Route path={`${path}/transactions`} component={Transaction} />
        <Route path={path} component={Dashboard} />

        <Route path="" component={Dashboard} />

      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Student, "student");
