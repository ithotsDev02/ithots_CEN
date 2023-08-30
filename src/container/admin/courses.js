// --Lokesh
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Main } from "../styled";
import { getAllCourses } from "../../redux/tutor/actionCreator";
import { useDispatch, useSelector } from "react-redux";

import Courses from "../courseCards/index";
const CourseCards = () => {
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  const courseList = useSelector((state) => state.tutors?.courses?.data);
  return (
    <>
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Courses courses={courseList} />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default CourseCards;
