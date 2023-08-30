// --Lokesh
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { PageHeader } from "../../components/page-headers/page-headers";
import { Cards } from "../../components/cards/frame/cards-frame";
import { getAllCourses } from "../../redux/tutor/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import Courses from "../courseCards/index";

import { Main } from "../styled";
const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses("student"));
  }, []);
  const courseList = useSelector((state) => state.tutors?.courses?.data);
  console.log('the course list is-', courseList)
  return (
    <div style={{ marginTop: "-5%" }}>
      {/* <PageHeader
        ghost
        title="Courses Enrolled"
        buttons={[<div key="6" className="page-header-actions"></div>]}
      /> */}
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Courses
              showSearch={false}
              courses={courseList}
              calledFrom={"Student"}
            />
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Dashboard;
