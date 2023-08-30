import React, { Fragment } from "react";
import { Rate } from "antd";
import { Card, Avatar, Row, Col, Tag } from "antd";
import { Menu, Dropdown } from "antd";
import { SettingTwoTone } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import CustomPopover from "../../../../components/popover/index";
import { DeleteOutlined } from "@ant-design/icons";
import { FieldTimeOutlined } from "@ant-design/icons";
import { VideoCameraOutlined } from "@ant-design/icons";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import Heading from "../../../../components/heading/heading";
import { Button } from "../../../../components/buttons/buttons";
import { ProductCard } from "../../Style";
import { GalleryCard } from "../../../pages/style";
import { Link, Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import "./style.css";
import { useHistory } from "react-router-dom";
import userA from "../../../../static/img/userA.svg";
import more from "../../../../static/img/more-vertical.svg";
import moment from "moment";
import errorNotification from "../../../../components/notification/errorNotification";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Switch as EnableDisable } from "antd";
const { Meta } = Card;
const ProductCards = ({
  isTutor,
  course,
  showModal,
  calledFrom,
  EnableDisableCourse,
  batchInfo,
  paymentDetails,
  allInfo,
  categories,
}) => {
  const history = useHistory();
  const { path } = useRouteMatch();

  let accessToken = localStorage.getItem("token") || "";
  // accessToken = "";
  const getCategoryName = (categoryId) => {
    let catgoryList = categories.data;
    let name = "";
    let filtered = catgoryList?.map((item) => {
      if (item.id == categoryId) {
        name = item.name;
        return;
      }
    });
    return name;
    // console.log("the data isa", categories);
  };
  const checkifPaid = (courseId) => {
    let isPaid = false;
    let shouldCheck = true;
    const currentMonth = moment().format("MM");
    allInfo.map((info) => {
      if (info.course_from_enroll_course.id === courseId) {
        if (info.enrollType == "ONE_TIME") {
          shouldCheck = false;
          isPaid = true;

          return;
        }
      }
    });
    if (shouldCheck == true) {
      paymentDetails.map((course) => {
        if (course.course_from_enroll_course.id === courseId) {
          course.duePayment.map((due) => {
            if (moment(due.transaction_date).format("MM") == currentMonth) {
              if (due.status !== "PENDING") {
                isPaid = true;
                return;
              }
            }
          });
        }
      });
    }

    return isPaid;
  };
  const launchMeeting = async (meetingId, course) => {
    let isPaid = await checkifPaid(course.id);

    //     var iframe = `<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://webrtc1.gurqool.live/?roomId=${meetingId}&accessToken=${accessToken}" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>`;
    // var win = window.open("http://localhost:3000/student","_blank");
    // win.document.write(iframe);
    if (isPaid === true) {
      window
        .open(
          "https://class.gurqool.live/?roomId=" +
            meetingId +
            "&accessToken=" +
            accessToken,
          "_blank"
        )
        .focus();
    } else {
      errorNotification(
        "Please pay the monthly payment to resume your classes"
      );
    }

    // window.open('https://webrtc1.gurqool.live/?roomId='+meetingId,'winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no', '_blank');
  };
  return (
    <div className="course">
      {isTutor ? (
        <CustomPopover
          content={
            <div>
              <p>{course.title}</p>
            </div>
          }
          maxheight={"500px"}
          maxWidth={"500px"}
          bodyContent={
            <ProductCard style={{ marginBottom: 30 }}>
              <ul>
                <li>
                  <Card
                    className="courseCard"
                    cover={
                      <div class="imgcontainer">
                        <img
                          height="190px"
                          style={{ cursor: "pointer" }}
                          // width="380px"
                          width="100%"
                          alt="courseImage"
                          onClick={() =>
                            history.push({
                              pathname: `${path}/coursedetail/${course.id}`,
                              state: {
                                isEdit: true,
                                courseInfo: course,
                                calledFrom: calledFrom,
                              },
                            })
                          }
                          src={
                            course.image
                              ? "https://api.esculae.com/" + course.image
                              : require(`../../../../static/img/blank.jpg`)
                          }
                        />
                        <div class="bottomright">
                          <Rate allowHalf defaultValue={course.rating || 4.5} />{" "}
                          {/* <span style={{ color: "#FA8B0C" }}>
                        {course.rating || 4.6}
                      </span> */}
                        </div>
                        <div className="bottomcenter">
                          <Tag color="success">Sample</Tag>
                        </div>
                        <Tag color="success">
                          {getCategoryName(course.category) || "No Title"}
                        </Tag>
                      </div>
                    }
                  >
                    <Meta
                      title={[
                        <Fragment>
                          <p className="course_discription">
                            <span
                              onClick={() =>
                                history.push({
                                  pathname: `${path}/coursedetail/${course.id}`,
                                  state: {
                                    isEdit: true,
                                    courseInfo: course,
                                    calledFrom: calledFrom,
                                  },
                                })
                              }
                            >
                              {course.title || "No Title"}
                            </span>{" "}
                            <Dropdown
                              overlay={
                                <Menu>
                                  {isTutor == true && (
                                    <Fragment>
                                      <Menu.Item
                                        onClick={() =>
                                          history.push({
                                            pathname: `${path}/createcourse`,
                                            state: {
                                              isEdit: true,
                                              courseInfo: course,
                                            },
                                          })
                                        }
                                        key="0"
                                      >
                                        <EditOutlined /> Edit
                                      </Menu.Item>
                                      <Menu.Item
                                        key="1"
                                        onClick={() => showModal(course)}
                                      >
                                        <DeleteOutlined /> Delete
                                      </Menu.Item>
                                    </Fragment>
                                  )}
                                  <Menu.Item key="2">
                                    <EnableDisable
                                      defaultChecked={course.is_active}
                                      onChange={(e) =>
                                        EnableDisableCourse(e, course)
                                      }
                                    />{" "}
                                    &nbsp;{" "}
                                    {course.is_active === true
                                      ? "Active"
                                      : "DeActiveted"}
                                  </Menu.Item>
                                </Menu>
                              }
                              trigger={["click"]}
                            >
                              <FeatherIcon
                                icon="more-vertical"
                                size={20}
                                style={{
                                  marginTop: "2px",
                                  float: "right",
                                  color: "#3174ad",
                                }}
                                // color={popular ? '#FF4D4F' : '#9299B8'}
                                // fill={popular ? '#FF4D4F' : 'none'}
                              />
                            </Dropdown>
                          </p>
                        </Fragment>,
                      ]}
                    />

                    <div>
                      <Avatar
                        src={
                          (course.created_by?.image &&
                            "https://api.esculae.com/" +
                              course.created_by?.image) ||
                          "https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"
                        }
                      ></Avatar>{" "}
                      <Link
                        style={{ padding: "0px", margin: "0" }}
                        to={`/${window.location.pathname.split('/')[1]}/tutor-profile/${course.created_by?.id}`}
                      >
                        <span className="createdbyname">
                          {course?.created_by?.full_name || "Unknown"}
                        </span>
                      </Link>
                      {isTutor == true || calledFrom === "admin" ? (
                        <span style={{ float: "right" }}>
                          {course.is_active === false ? (
                            <Tag
                              icon={<ExclamationCircleOutlined />}
                              color="error"
                            >
                              De-Activated
                            </Tag>
                          ) : (
                            <Tag icon={<CheckCircleOutlined />} color="success">
                              Active
                            </Tag>
                          )}
                        </span>
                      ) : (
                        <Fragment></Fragment>
                      )}
                      {calledFrom != "Student" ? (
                        <Button
                          style={{
                            width: "100%",
                            background: "#f5aa22",
                            marginTop: "10px",
                          }}
                          onClick={() =>
                            history.push({
                              pathname: `${path}/createcourse`,
                              state: {
                                isSchedule: true,
                                courseInfo: course,
                              },
                            })
                          }
                          type="primary"
                        >
                          <FeatherIcon
                            icon="clock"
                            size={20}
                            style={{
                              float: "right",
                              color: "white",
                            }}
                            // color={popular ? '#FF4D4F' : '#9299B8'}
                            // fill={popular ? '#FF4D4F' : 'none'}
                          />
                          Schedule Batch
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>

                    {calledFrom === "Student" ? (
                      <p style={{ margin: "0px" }}>Batch - Morning Batch</p>
                    ) : null}
                  </Card>
                </li>
              </ul>
            </ProductCard>
          }
        />
      ) : (
        <ProductCard style={{ marginBottom: 30 }}>
          <ul>
            <li>
              <Card
                className="courseCard"
                cover={
                  <div class="imgcontainer">
                    <img
                      height="190px"
                      style={{ cursor: "pointer" }}
                      // width="380px"
                      width="100%"
                      alt="courseImage"
                      onClick={() =>
                        history.push({
                          pathname:
                            calledFrom == "profilepage"
                              ? `${path}/coursedetail/${course.id}`
                              : `${path}/coursedetail/${course.id}`,
                          state: {
                            isEdit: true,
                            courseInfo: course,
                            calledFrom: calledFrom,
                          },
                        })
                      }
                      src={
                        course.image
                          ? "https://api.esculae.com/" + course.image
                          : require(`../../../../static/img/blank.jpg`)
                      }
                    />
                    <div class="bottomright">
                      <Rate allowHalf defaultValue={course.rating || 4.5} />{" "}
                      {/* <span style={{ color: "#FA8B0C" }}>
                        {course.rating || 4.6}
                      </span> */}
                    </div>
                    <div className="bottomleft">
                      <Tag color="success">
                        {getCategoryName(course.category) || "No Title"}
                      </Tag>
                    </div>
                  </div>
                }
              >
                <Meta
                  title={[
                    <p
                      onClick={() =>
                        history.push({
                          pathname:
                            calledFrom == "profilepage"
                              ? `${path}/coursedetail/${course.id}`
                              : `${path}/coursedetail/${course.id}`,
                          state: {
                            isEdit: true,
                            courseInfo: course,
                            calledFrom: calledFrom,
                          },
                        })
                      }
                      className="course_discription"
                    >
                      {course.title || "No Title"}{" "}
                    </p>,
                  ]}
                />
                <div>
                  <Avatar
                    src={
                      (course.created_by?.image &&
                        "https://api.esculae.com/" +
                          course.created_by?.image) ||
                      "https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"
                    }
                  ></Avatar>{" "}
                  <a
                    style={{ padding: "0px", margin: "0" }}
                    href={`/${window.location.pathname.split('/')[1]}/tutor-profile/${course.created_by?.id}`}
                  >
                    <span className="createdbyname">
                      {course?.created_by?.full_name || "Unknown"}
                    </span>
                  </a>
                  {/* {calledFrom != "Student" ? (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#70b2c5",
                        color: "white",
                        marginTop: "10px",
                        borderRadius: "3px",
                        padding: "10px",
                      }}
                    >
                      <span>
                        <span
                            onClick={() => {
                              history.push({
                                pathname: calledFrom == "profilepage"
                                  ? `/${window.location.pathname.split('/')[1]}/coursedetail/${course.id}`
                                  : `${path}/coursedetail/${course.id}`,
                                state: {
                                  isEdit: true,
                                  courseInfo: course,
                                  calledFrom: calledFrom,
                                },
                              })
                            }}
                          style={{
                            cursor: "pointer",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          VIEW COURSE DETAILS &nbsp;
                        </span>
                        <span style={{ fontSize: 16, fontWeight: 600 }}>
                           &#x20B9; {course.price || 5050}
                        </span>
                      </span>
                    </span>
                  ) : (
                    ""
                  )} */}
                  {isTutor == true || calledFrom === "admin" ? (
                    <div>
                      <>
                        {course.is_active === false ? (
                          <Tag
                            icon={<ExclamationCircleOutlined />}
                            color="error"
                          >
                            De-Activated
                          </Tag>
                        ) : (
                          <Tag icon={<CheckCircleOutlined />} color="success">
                            Active
                          </Tag>
                        )}
                      </>
                      <Dropdown
                        overlay={
                          <Menu>
                            {isTutor == true && (
                              <Fragment>
                                <Menu.Item
                                  onClick={() =>
                                    history.push({
                                      pathname: `${path}/createcourse`,
                                      state: {
                                        isEdit: true,
                                        courseInfo: course,
                                      },
                                    })
                                  }
                                  key="0"
                                >
                                  <EditOutlined /> Edit
                                </Menu.Item>
                                <Menu.Item
                                  key="1"
                                  onClick={() => showModal(course)}
                                >
                                  <DeleteOutlined /> Delete
                                </Menu.Item>

                                <Menu.Item
                                  key="3"
                                  onClick={() =>
                                    history.push({
                                      pathname: `${path}/createcourse`,
                                      state: {
                                        isSchedule: true,
                                        courseInfo: course,
                                      },
                                    })
                                  }
                                >
                                  <FieldTimeOutlined /> Schedule
                                </Menu.Item>
                              </Fragment>
                            )}
                            <Menu.Item key="2">
                              <EnableDisable
                                defaultChecked={course.is_active}
                                onChange={(e) => EnableDisableCourse(e, course)}
                              />{" "}
                              &nbsp;{" "}
                              {course.is_active === true
                                ? "Active"
                                : "DeActiveted"}
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <a
                          className="ant-dropdown-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img style={{ float: "right" }} alt="" src={more} />
                        </a>
                      </Dropdown>
                    </div>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </div>

                {calledFrom === "Student" ? (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#3174ad",
                      marginTop: "10px",
                    }}
                  >
                    <p style={{ margin: "0px" }}>
                      <b>Batch</b> : {batchInfo?.name}
                    </p>
                    <p style={{ margin: "0px" }}>
                      <b>Timing</b> :{" "}
                      {moment(batchInfo?.start_time, "HH:mm:ss").format(
                        "HH : mm A"
                      )}{" "}
                      -{" "}
                      {moment(batchInfo?.end_time, "HH:mm:ss").format(
                        "HH : mm A"
                      )}
                    </p>
                    <p>
                      <b>Duration</b> : {batchInfo?.total_duration} Month's
                    </p>
                    <span>
                      <Button
                        type="primary"
                        icon={<VideoCameraOutlined />}
                        size="small"
                        block
                        style={{ background: "#f5aa22" }}
                        disabled={!batchInfo && !batchInfo?.meeting_room}
                        onClick={() =>
                          launchMeeting(
                            batchInfo && batchInfo?.meeting_room,
                            course
                          )
                        }
                      >
                        Join Meeting
                      </Button>
                    </span>
                  </div>
                ) : null}
              </Card>
            </li>
          </ul>
        </ProductCard>
      )}
    </div>
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
