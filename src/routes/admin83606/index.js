import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Dashboard from "./dashboard";
import CoursesHome from "./AllCourses";
import withAdminLayout from "../../layout/withAdminLayout";
import CourseInfo from "./coursedetail";
import TutorLst from "./tutorlist";
import StudentLst from "./studentlist";
import Transaction from "./transactions";
const Admin = () => {
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
        <Route path={`${path}/transactions`} component={Transaction} />

        <Route path={`${path}/courses`} component={CoursesHome} />
        <Route path={`${path}/coursedetail/:id`} component={CourseInfo} />
        <Route path={`${path}/tutors`} component={TutorLst} />
        <Route path={`${path}/students`} component={StudentLst} />

        <Route path={path} component={Dashboard} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin, "admin");
