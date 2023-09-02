import React, { useEffect, lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Skeleton,
  Spin,
  Tag,
  Progress,
  Divider,
  Comment,
  Tooltip,
} from "antd";
import FeatherIcon from "feather-icons-react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import moment from "moment";
import { PageHeader } from "../../components/page-headers/page-headers";
import { Main } from "../styled";
// import { filterSinglePage } from '../../../redux/product/actionCreator'; s
import { ProductDetailsWrapper } from "./Style";
import { Cards } from "../../components/cards/frame/cards-frame";
import { Button } from "../../components/buttons/buttons";
import { ShareButtonPageHeader } from "../../components/buttons/share-button/share-button";
import { ExportButtonPageHeader } from "../../components/buttons/export-button/export-button";
import { CalendarButtonPageHeader } from "../../components/buttons/calendar-button/calendar-button";
import { Card, Avatar } from "antd";
import { Rate } from "antd";
import { Breadcrumb } from "antd";
import { getCouseInfo } from "../../redux/course/actionCreator";
import { getAllCourses } from "../../redux/tutor/actionCreator";
import Product from "../ecommerce/product/Products";
import SimilarCourses from "./overview/SimilarCourses";
import "./details.css";
import axiosInstance from "../../config/axoisconfig";
const DetailsRight = lazy(() => import("./overview/DetailsRight"));

const CourseDetail = () => {
  const dispatch = useDispatch();
  const [courseInfo, setcourseInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [allBatches, setallBatches] = useState([]);
  const [courseBatches, setCourseBatches] = useState([]);
  const [similarCourses, setSimilarCourses] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [cat, setcat] = useState("");
  const [facultyList, setfacultyList] = useState([]);
  const [fullCoursedetails, setfullCoursedetails] = useState([]);
  const { path } = useRouteMatch();
  const location = useLocation();
  const [subcat, setsubcat] = useState("");
  // const calledFrom = location.state.calledFrom || "";

  let calledFrom = "profilepage";
  if (location.state && location.state.calledFrom) {
    calledFrom = location.state.calledFrom
  }

  let { id } = useParams();

  useEffect(() => {
    // dispatch(getCouseInfo(id))
    setisLoading(true);
    const coursesURL = "https://api-v2.esculae.com/api/v1/course/course/" + id;
    axiosInstance
      .get(coursesURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setcourseInfo(resp.data);
        setisLoading(false);
        getBatches(resp.data.created_by, resp.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (courseInfo && Object.keys(courseInfo).length > 0) {
      setisLoading(true);
      const coursesURL =
        "https://api-v2.esculae.com/api/v1/course/similarcourse/" +
        courseInfo.category;
      axiosInstance
        .get(coursesURL, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          setSimilarCourses(resp.data);
          setisLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [courseInfo]);
  useEffect(() => {
    var faculty = "";
    // dispatch(getAllCourses());
    faculty = "https://api-v2.esculae.com/api/v1/personal/faculty";
    axiosInstance
      .get(faculty, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("the data is", resp.data.data);
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
    if (courseInfo && facultyList.length > 0) {
      let tmpCourses = {};
      let item = courseInfo;
      let filteredTutor = findFaculty(item.created_by);
      (tmpCourses.id = item.id),
        (tmpCourses.title = item.title),
        (tmpCourses.category = item.category),
        (tmpCourses.sub_category = item.sub_category),
        (tmpCourses.course_level = item.course_level),
        (tmpCourses.short_description = item.short_description),
        (tmpCourses.image = item.image),
        (tmpCourses.key_points = item.key_points),
        (tmpCourses.tags = item.tags),
        (tmpCourses.details_description = item.details_description),
        (tmpCourses.keywords = item.keywords),
        (tmpCourses.special_description = item.special_description),
        (tmpCourses.duration = item.duration),
        (tmpCourses.age_limit = item.age_limit),
        (tmpCourses.language = item.language),
        (tmpCourses.is_active = item.is_active),
        (tmpCourses.region_id = 1),
        (tmpCourses.created_by = filteredTutor),
        setfullCoursedetails(tmpCourses);
    }
  }, [courseInfo, facultyList]);

  const getBatches = (created_by, course_id) => {
    let url = `https://api-v2.esculae.com/api/v1/course/batch?created_by=${created_by}&course_id=${course_id}`;
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setallBatches(resp.data);
      })
      .catch((err) => {
        console.log("Error in getting batches", err);
      });
  };

  const filterBatch = (allBatches, courseId) => {
    let CourseBatch = allBatches.filter(
      (batch) => batch.participants_size > 0
    );
    return CourseBatch;
  };
  useEffect(() => {
    if (allBatches && allBatches.data && courseInfo) {
      setCourseBatches(filterBatch(allBatches.data, courseInfo.id));
    }
  }, [allBatches, courseInfo]);
  useEffect(() => {
    let Categories = [];
    let Subcategories = [];
    const categoryURL = "https://api-v2.esculae.com/api/v1/course/category";
    const subCategoryURL =
      "https://api-v2.esculae.com/api/v1/course/sub-category";
    Promise.all([
      axiosInstance.get(categoryURL),
      axiosInstance.get(subCategoryURL),
    ])
      .then((responses) => {
        Categories = responses[0].data;
        Subcategories = responses[1].data;
        setCategories(Categories.data);
        setsubcategories(Subcategories.data);
      })
      .catch((errors) => {
        console.log("Error in getting api response", errors);
      });
  }, []);

  return (
    <Main style={{ marginTop: "-5%", background: "white" }}>
      <Row
        style={{ maxWidth: "1180px", marginLeft: "auto", marginRight: "auto" }}
        gutter={25}
      >
        <Col>
          {isLoading ? (
            <Col span={24}>
              <div className="spin">
                <Spin />
              </div>
            </Col>
          ) : (
            <div className="detailsContainer">
              {/* <Cards headless> */}
              <div className="breadcrumb">
                <Breadcrumb>
                  <Breadcrumb.Item href="/home">
                    <span>Courses</span>
                  </Breadcrumb.Item>
                  {courseInfo &&
                    courseInfo.category &&
                    categories &&
                    categories.length > 0
                    ? categories.map((item) =>
                      item.id == courseInfo.category ? (
                        <>
                          <Breadcrumb.Item>
                            <a href="">{item.name}</a>
                          </Breadcrumb.Item>
                        </>
                      ) : null
                    )
                    : null}
                  {courseInfo &&
                    courseInfo.category &&
                    subcategories &&
                    categories.length > 0
                    ? subcategories.map((item) =>
                      item.id == courseInfo.sub_category ? (
                        <>
                          <Breadcrumb.Item>
                            <a href="">{item.name}</a>
                          </Breadcrumb.Item>
                        </>
                      ) : null
                    )
                    : null}
                </Breadcrumb>
              </div>
              <ProductDetailsWrapper>
                <div
                  style={{ paddingTop: "0px" }}
                  className="product-details-box"
                >
                  <Row gutter={30}>
                    <Col xs={24} sm={24} xl={15} md={15} lg={15}>
                      <div className="courseDetail">
                        <span
                          style={{
                            fontSize: 30,
                            fontWeight: 600,
                            color: "#18113c",
                          }}
                        >
                          {courseInfo?.title}
                        </span>
                        <div>
                          <Avatar
                            src={
                              (fullCoursedetails.created_by?.image &&
                                "https://api-v2.esculae.com/" +
                                fullCoursedetails.created_by?.image) ||
                              ""
                            }
                          ></Avatar>
                          &nbsp;
                          <Link
                            style={{
                              padding: "0px",
                              margin: "0",
                              color: "#0f7c90",
                            }}
                            to={`/home/profile/${fullCoursedetails.created_by?.id}`}
                          >
                            <span style={{ fontSize: "14px", fontWeight: 500 }}>
                              {fullCoursedetails?.created_by?.full_name ||
                                "Unknown"}
                            </span>
                          </Link>
                          &nbsp; &nbsp;
                          <span>
                            {/* <span style={{ color: "#c1c1c1" }}> | </span> */}
                            <Rate disabled defaultValue={courseInfo?.rating} />
                            {courseInfo?.rating}
                            <span style={{ color: "#c1c1c1" }}>
                              {" "}
                              (420 ratings){" "}
                            </span>
                          </span>
                        </div>
                        <figure>
                          <img
                            style={{
                              width: "100%",
                              maxWidth: "700px",
                              maxHeight: "400px",
                              // marginLeft: "5%",
                              // marginRight: "5%",
                            }}
                            src={
                              "https://api-v2.esculae.com/" + courseInfo?.image
                            }
                            alt=""
                          />
                          {console.log("the course info is", courseInfo)}
                        </figure>
                        <span style={{ marginTop: "10px" }}>
                          <Tag
                            style={{ fontSize: 14, padding: "10px" }}
                            color="geekblue"
                          >
                            Course Level:{" "}
                            <b>
                              {courseInfo?.course_level == 3
                                ? "Advanced"
                                : courseInfo?.course_level == 2
                                  ? "Intermediate"
                                  : "Beginer"}{" "}
                            </b>
                          </Tag>{" "}
                          <Tag
                            style={{ fontSize: 14, padding: "10px" }}
                            color="geekblue"
                          >
                            Age Level: <b>{courseInfo?.age_limit}+ Years</b>
                          </Tag>
                          <Tag
                            style={{ fontSize: 14, padding: "10px" }}
                            color="geekblue"
                          >
                            Course Language: <b>{courseInfo?.language}</b>
                          </Tag>
                        </span>
                        {/* <Divider></Divider> */}
                        {/* <span style={{ marginTop: "10px" }}>
                          {courseInfo &&
                            courseInfo.tags &&
                            courseInfo?.tags.map((tag) => (
                              <Tag style={{ fontSize: 12 }} color="warning">
                                {tag}
                              </Tag>
                            ))}
                        </span> */}
                        {/* <div
                          className="course_level"
                          style={{
                            marginTop: "20px",
                            padding: "20px",
                          }}
                        >
                          <span>
                            {" "}
                            Course Level:{" "}
                            {courseInfo?.course_level == 3
                              ? "Advanced"
                              : courseInfo?.course_level == 2
                              ? "Intermediate"
                              : "Beginer"}{" "}
                          </span>{" "}
                          |{" "}
                          <span>Age Level: {courseInfo?.age_limit}+ Years</span>
                        </div> */}
                        <div
                          className="learning_div"
                          style={{ marginTop: "10px", padding: "18px" }}
                        >
                          <span style={{ fontSize: 20, fontWeight: 600 }}>
                            Key Notes:
                          </span>
                          <div>
                            <ul
                              style={{
                                marginTop: "10px",
                                paddingBottom: "15px",
                              }}
                            >
                              {courseInfo.key_points &&
                                courseInfo.key_points.map(
                                  (item) =>
                                    item !== "" && (
                                      <li
                                        style={{
                                          listStyle: "none",
                                          display: "flex",
                                          fontWeight: 500,
                                          paddingBottom: 10,
                                        }}
                                      >
                                        <FeatherIcon
                                          icon="check"
                                          size={20}
                                          style={{
                                            marginTop: "3px",
                                            paddingRight: "5px",
                                            // float: "right",
                                            color: "green",
                                          }}
                                        // color={popular ? '#FF4D4F' : '#9299B8'}
                                        // fill={popular ? '#FF4D4F' : 'none'}
                                        />{" "}
                                        &nbsp;
                                        {item}
                                      </li>
                                    )
                                )}
                            </ul>
                          </div>
                        </div>
                        <div className="course_about">
                          <span style={{ fontSize: 20, fontWeight: 500 }}>
                            Course Details
                          </span>
                          <div
                            style={{ marginTop: "10px" }}
                            dangerouslySetInnerHTML={{
                              __html: courseInfo?.details_description || "",
                            }}
                          />
                        </div>
                        <div className="course_specialDescription">
                          <span style={{ fontSize: 20, fontWeight: 500 }}>
                            Special Description
                          </span>
                          <p style={{ marginTop: "10px" }}>
                            {courseInfo?.special_description}
                          </p>
                        </div>
                        <Divider></Divider>

                        <div className="course_specialDescription">
                          <span style={{ fontSize: 20, fontWeight: 500 }}>
                            About Tutor
                          </span>
                          
                        </div>

                        <Avatar
                          src={
                            (fullCoursedetails.created_by?.image &&
                              "https://api-v2.esculae.com/" +
                              fullCoursedetails.created_by?.image) ||
                            ""
                          }
                        ></Avatar>
                        &nbsp;
                        <Link
                          style={{
                            padding: "0px",
                            margin: "0",
                            color: "#cc5252",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                          to={`/home/profile/${fullCoursedetails.created_by?.id}`}
                        >
                          <span
                            style={{
                              fontSize: "18px",
                              paddingLeft: "20px",
                              fontWeight: 500,
                            }}
                          >
                            {fullCoursedetails?.created_by?.full_name ||
                              "Unknown"}
                          </span>
                        </Link>
                        <div className="course_specialDescription">
                          <p style={{ fontSize: "14px", fontWeight: 400 }}>
                            Test {courseInfo?.special_description}
                          </p>
                        </div>
                        <Divider></Divider>
                        <div className="rating">
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 500,
                              color: "#0f7c90",
                            }}
                          >
                            Ratings & Review
                          </span>
                          <Row
                            gutter={25}
                            style={{ display: "flex", marginTop: "10px" }}
                          >
                            <Col
                              style={{
                                paddingRight: "0px",
                                fontSize: 16,
                                color: "rgb(172 173 181)",
                              }}
                              span={2}
                            >
                              <Row>
                                <Col>
                                  5{" "}
                                  <FeatherIcon
                                    icon="star"
                                    size={18}
                                    style={{
                                      marginTop: "2px",
                                    }}
                                    color={"#d1d2db"}
                                    fill={"#d1d2db"}
                                  />{" "}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  4{" "}
                                  <FeatherIcon
                                    icon="star"
                                    size={18}
                                    style={{
                                      marginTop: "2px",
                                    }}
                                    color={"#d1d2db"}
                                    fill={"#d1d2db"}
                                  />{" "}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  3{" "}
                                  <FeatherIcon
                                    icon="star"
                                    size={18}
                                    style={{
                                      marginTop: "2px",
                                    }}
                                    color={"#d1d2db"}
                                    fill={"#d1d2db"}
                                  />{" "}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  2{" "}
                                  <FeatherIcon
                                    icon="star"
                                    size={18}
                                    style={{
                                      marginTop: "2px",
                                    }}
                                    color={"#d1d2db"}
                                    fill={"#d1d2db"}
                                  />{" "}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  1{" "}
                                  <FeatherIcon
                                    icon="star"
                                    size={18}
                                    style={{
                                      marginTop: "2px",
                                    }}
                                    color={"#d1d2db"}
                                    fill={"#d1d2db"}
                                  />{" "}
                                </Col>
                              </Row>
                            </Col>
                            <Col style={{ paddingLeft: "0px" }} span={10}>
                              <Progress
                                strokeColor="rgb(250 139 12)"
                                percent={30}
                                showInfo={false}
                                style={{ marginBottom: "12px" }}
                              />
                              <Progress
                                strokeColor="rgb(250 139 12)"
                                percent={50}
                                showInfo={false}
                                style={{ marginBottom: "12px" }}
                              />
                              <Progress
                                strokeColor="rgb(250 139 12)"
                                percent={90}
                                showInfo={false}
                                style={{ marginBottom: "12px" }}
                              />{" "}
                              <Progress
                                strokeColor="rgb(250 139 12)"
                                percent={100}
                                style={{ marginBottom: "12px" }}
                                showInfo={false}
                              />{" "}
                              <Progress
                                strokeColor="rgb(250 139 12)"
                                percent={30}
                                style={{ marginBottom: "12px" }}
                                showInfo={false}
                              />
                            </Col>
                            <Col span={8}>
                              <Row
                                style={{
                                  fontSize: 45,
                                  fontWeight: 500,
                                  color: "rgb(250 139 12)",
                                }}
                              >
                                3.5
                              </Row>
                              <Row>
                                <Rate disabled defaultValue={3.5} />
                              </Row>
                              <Row
                                style={{
                                  fontWeight: 600,
                                  color: "rgb(172 173 181)",
                                }}
                              >
                                11 reviews
                              </Row>
                            </Col>
                          </Row>
                          <br />
                          <Row gutter={24}>
                            <Col span={24}>
                              <Comment
                                style={{ marginTop: "20px" }}
                                actions={
                                  <Tooltip
                                    title={moment().format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                  >
                                    <span>{moment().fromNow()}</span>
                                  </Tooltip>
                                }
                                author={
                                  <a style={{ display: "flex", fontSize: 17 }}>
                                    <span style={{ fontWeight: 700 }}>
                                      Ramesh
                                    </span>{" "}
                                    &nbsp;
                                    <FeatherIcon
                                      icon="star"
                                      size={15}
                                      // style={{
                                      //   marginTop: "2px",
                                      // }}
                                      color={"#fa8b0c"}
                                      fill={"#fa8b0c"}
                                    />{" "}
                                    <span
                                      style={{ color: "#fa8b0c", fontSize: 14 }}
                                    >
                                      {" "}
                                      5
                                    </span>
                                  </a>
                                }
                                avatar={
                                  <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                  />
                                }
                                content={
                                  <p>
                                    The quality of teaching was amazing and now
                                    the tutor has even more courses great going
                                    only concern is the audio quality in app.
                                  </p>
                                }
                                datetime={
                                  <Tooltip
                                    title={moment().format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                  >
                                    <span>{moment().fromNow()}</span>
                                  </Tooltip>
                                }
                              />
                              <Divider></Divider>

                              <Comment
                                style={{ marginTop: "20px" }}
                                actions={
                                  <Tooltip
                                    title={moment().format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                  >
                                    <span>{moment().fromNow()}</span>
                                  </Tooltip>
                                }
                                author={
                                  <a style={{ display: "flex", fontSize: 17 }}>
                                    <span style={{ fontWeight: 700 }}>
                                      Mahesh
                                    </span>{" "}
                                    &nbsp;
                                    <FeatherIcon
                                      icon="star"
                                      size={15}
                                      // style={{
                                      //   marginTop: "2px",
                                      // }}
                                      color={"#fa8b0c"}
                                      fill={"#fa8b0c"}
                                    />{" "}
                                    <span
                                      style={{ color: "#fa8b0c", fontSize: 14 }}
                                    >
                                      {" "}
                                      5
                                    </span>
                                  </a>
                                }
                                avatar={
                                  <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                  />
                                }
                                content={
                                  <p>
                                    The quality of teaching was amazing and now
                                    the tutor has even more courses great going
                                    only concern is the audio quality in app.
                                  </p>
                                }
                                datetime={
                                  <Tooltip
                                    title={moment().format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                  >
                                    <span>{moment().fromNow()}</span>
                                  </Tooltip>
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                        {/* <div className="intructor">
                          <span style={{ fontSize: 26, fontWeight: 600 }}>
                            Instructor Details
                          </span>
                        </div> */}
                        {/* <div className="course_tnc">
                          <h2>Terms & Conditions</h2>
                          <p>
                            Accept all the terms and conditons before purchasing
                            course. Accept all the terms and conditons before
                            purchasing course Accept all the terms and conditons
                            before purchasing course
                          </p>
                        </div> */}
                      </div>
                    </Col>
                    <Col xs={24} sm={24} xl={9} md={9} lg={9}>
                      <Suspense
                        fallback={
                          <Cards headless>
                            <Skeleton active />
                          </Cards>
                        }
                      >
                        <DetailsRight
                          courseBatches={courseBatches}
                          courseInfo={fullCoursedetails}
                          price={fullCoursedetails?.price || 0}
                          calledFrom={calledFrom}
                        />
                      </Suspense>
                    </Col>
                  </Row>
                </div>
              </ProductDetailsWrapper>
              {/* </Cards>   */}
            </div>
          )}
        </Col>
      </Row>
    </Main>
  );
};

CourseDetail.propTypes = {
  match: PropTypes.object,
};

export default CourseDetail;
