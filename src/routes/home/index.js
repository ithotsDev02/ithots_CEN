import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CoursesHome from "./allCourses";
import withAdminLayout from "../../layout/withAdminLayout";
import CourseInfo from "./coursedetail";
import Profile from "./profile";
import { withRouter } from "react-router";
import Payments from "./paymentSuccess";
import ItemCart from "./cart";
import TutorProfile from "../tutor/profile";

const Home = () => {
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
        <Route path={`${path}/profile/:id`} component={TutorProfile} />
        <Route path={`${path}/tutor-profile/:id`} component={TutorProfile} />
        <Route path={`${path}/paymentsuccess`} component={Payments} />
        <Route path={`${path}/cart`} component={ItemCart} />
        <Route path={`${path}/coursedetail/:id`} component={CourseInfo} />
        <Route path={path} component={CoursesHome} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Home);
