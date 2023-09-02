import React from "react";
import { Row, Col } from "antd";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";
// import SwiperCore, { Navigation, Pagination } from "swiper";
// import Swiper from "react-id-swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Card, Avatar } from "antd";
import { Rate } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { TestimonialStyleWrapper } from "./style";
import { PageHeader } from "../../../components/page-headers/page-headers";
import { Main } from "../../styled";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Button } from "../../../components/buttons/buttons";
import { ShareButtonPageHeader } from "../../../components/buttons/share-button/share-button";
import { ExportButtonPageHeader } from "../../../components/buttons/export-button/export-button";
import { CalendarButtonPageHeader } from "../../../components/buttons/calendar-button/calendar-button";
import "swiper/swiper.scss";
const { Meta } = Card;

import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination]);
import "./SimilarCourses.css";
const SimilarCourses = ({ courseList }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const currentPath = window.location.pathname.split("/")[1] || "";
  return (
    <Main style={{ backgroundColor: "inherit" }}>
      <Row gutter={25}>
        <Col sm={24} xs={24}>
          <TestimonialStyleWrapper>
            {/* <Cards headless> */}
            <div
              className="testimonial-block theme-2"
              style={{ padding: "0px" }}
            >
              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                navigation
                //   loop={true}
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
              >
                {courseList &&
                  courseList.data &&
                  courseList.data.map((course) => (
                    <SwiperSlide style={{ padding: "0px" }}>
                      <Card
                        style={{
                          maxWidth: "250px",
                          // height: "339px",
                          border: "solid 1px lightgray !important",
                        }}
                        cover={
                          <img
                            height="190px"
                            width="380px"
                            style={{ cursor: "pointer" }}
                            alt="courseImage"
                            onClick={() =>
                              history.push({
                                pathname: `/${currentPath}/coursedetail/${course.id}`,
                                state: {
                                  isEdit: true,
                                  courseInfo: course,
                                  // calledFrom: calledFrom,
                                },
                              })
                            }
                            src={"https://api-v2.esculae.com/" + course.image}
                          />
                        }
                        actions={[
                          <>
                            <Rate
                              allowHalf
                              defaultValue={course.rating || 4.5}
                            />{" "}
                            &nbsp;
                            <span style={{ color: "#FA8B0C" }}>
                              {course.rating || 4.6}
                            </span>{" "}
                          </>,
                          <span>
                            <span style={{ fontSize: 16, fontWeight: 600 }}>
                              <span style={{ fontSize: 11, fontWeight: 600 }}>
                                STARTING AT &nbsp;
                              </span>
                              <span>&#x20B9; {course.price || 5050}</span>
                            </span>
                          </span>,
                        ]}
                      >
                        <Meta
                          avatar={
                            <Avatar
                              src={
                                (course.created_by?.image &&
                                  "https://api-v2.esculae.com/" +
                                    course.created_by?.image) ||
                                ""
                              }
                            ></Avatar>
                          }
                          title={[
                            <div>
                              <span style={{ fontSize: 13, color: "gray" }}>
                                {course?.created_by?.full_name || "Unknown"}
                              </span>
                            </div>,
                          ]}
                        />

                        <p
                          style={{
                            paddingLeft: "4px",
                            paddingRight: "4px",
                            height: "40px",
                          }}
                          onClick={() =>
                            history.push({
                              pathname: `/${currentPath}/coursedetail/${course.id}`,
                              state: {
                                isEdit: true,
                                courseInfo: course,
                                // calledFrom: calledFrom,
                              },
                            })
                          }
                          className="course_discription"
                        >
                          {course.title || "No Title"}
                        </p>
                      </Card>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            {/* </Cards> */}
          </TestimonialStyleWrapper>
        </Col>
      </Row>
    </Main>
  );
};

export default SimilarCourses;
