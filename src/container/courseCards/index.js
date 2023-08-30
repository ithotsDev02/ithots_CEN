import React, { useState, useEffect } from "react";

import "./style.css";
import { Card, Avatar } from "antd";
import CourseStat from "../statCards/stats";
import { Rate } from "antd";
import { Link, Route, useRouteMatch, NavLink } from "react-router-dom";
import {
  MenuOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Confirmation from "../superadmin/ConfirmationBox/index";
import { Row, Col, Pagination, Spin } from "antd";
import { Menu, Dropdown } from "antd";
import { SettingTwoTone } from "@ant-design/icons";
import { EditTwoTone } from "@ant-design/icons";
import { DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CreateCourse from "../CreateCourse/index";
import { Modal, Button } from "antd";
import MoreMenu from "../../components/moreMenuItem/index";
import { disable } from "../../redux/course/actionCreator";
import Heading from "../../components/heading/heading";
import { PaginationWrapper, NotFoundWrapper } from "../ecommerce/Style";
import { ProductCard } from "../ecommerce/Style";
import Product from "../ecommerce/product/Products";
import axiosInstance from "../../config/axoisconfig";
import { Switch } from "antd";
const { Meta } = Card;
const Courses = ({ courses, calledFrom, showSearch }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.course.loading);
  const { path } = useRouteMatch();
  const [showMore, setshowMore] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [fullCoursedetails, setfullCoursedetails] = useState([]);
  const [facultyList, setfacultyList] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    var faculty = "";
    // dispatch(getAllCourses());
    faculty = "https://api.esculae.com/api/v1/personal/faculty";
    axiosInstance
      .get(faculty, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setfacultyList(resp.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const findFaculty = (id) => {
    return facultyList.find((fac) => fac.id == id);
  };
  useEffect(() => {
    if (courses && courses.length > 0 && facultyList.length > 0) {
      let tmpCourses = [];
      courses.map((item) => {
        let filteredTutor = findFaculty(item.created_by);
        tmpCourses.push({
          id: item.id,
          title: item.title,
          category: item.category,
          sub_category: item.sub_category,
          course_level: item.course_level,
          short_description: item.short_description,
          image: item.image,
          key_points: item.key_points,
          tags: item.tags,
          details_description: item.details_description,
          keywords: item.keywords,
          special_description: item.special_description,
          duration: item.duration,
          age_limit: item.age_limit,
          language: item.language,
          is_active: true,
          region_id: 1,
          created_by: filteredTutor,
        });
      });
      setfullCoursedetails(tmpCourses);
    }
  }, [courses, facultyList]);
  const showModal = (course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    if (selectedCourse.id) {
      dispatch(disable(selectedCourse.id, { is_active: false }));
      setIsModalVisible(false);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <main className="wrapper">
      {/* {calledFrom === "tutor" && ( */}
      <section
        className="stat_cards"
        style={{ marginBottom: "5%", marginTop: "-5%" }}
      >
        {calledFrom == "Student" ? null : <CourseStat courseCount={courses ? courses.length : 0} />}
      </section>
      {/* )} */}
      <Confirmation
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title="Delete Course"
        message="Are you sure? Once deleted it can not be restored later."
      ></Confirmation>
      <Product
        isTutor={calledFrom == "Student" ? false : true}
        isStudent={calledFrom == "Student" ? true : false}
        showSearch={showSearch}
        showModal={showModal}
        calledFrom={calledFrom}
        courseList={fullCoursedetails && fullCoursedetails}
      />
    </main>
  );
};
export default Courses;
