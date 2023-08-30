import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Dashboard from "./dashboard";
import NewUserForm from "./tutorRegister";
import CreateCourse from "./CreateCourse";
import withAdminLayout from "../../layout/withAdminLayout";
import CourseInfo from "./coursedetail";
import EnrolledStudents from "./studentsList";
import Transaction from "./transactions";
import ItemCart from "./cart";
import Calendar from "./calendar";
import Profile from "./profile";
import Info from "./bankdetails";
const Tutor = () => {
  const { path } = useRouteMatch();
  console.log("inside the route");
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={`${path}/cart`} component={ItemCart} />
        <Route path={`${path}/calendar`} component={Calendar} />
        <Route path={`${path}/newTutor`} component={NewUserForm} />
        <Route path={`${path}/tutor-profile/:id`} component={Profile} />
        <Route path={`${path}/profile/:id`} component={Profile} />
        <Route path={`${path}/studentslist`} component={EnrolledStudents} />
        <Route path={`${path}/coursedetail/:id`} component={CourseInfo} />
        <Route path={path} exact component={Dashboard} />
        <Route path={`${path}/createcourse`} component={CreateCourse} />
        <Route path={`${path}/transactions`} component={Transaction} />
        <Route path={`${path}/bankaccount`} component={Info} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Tutor, "tutor");
